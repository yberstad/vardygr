import React, {Component} from 'react';
import Meteor, {createContainer} from 'react-native-meteor';
import RouteTracker from './RouteTracker';
import { getBeaconList, getTimetableListForStopId } from '../../lib/routeHelper';
import { getFirstWord } from '../../lib/string';


class RouteTrackerContainer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      canCalculateArrivalList: true,
      currentStop: '',
      direction: '',
      arrivalList: []
    }
    this.calculateArrivalList.bind(this);
  }
  
  componentWillMount(){
    console.log('componentWillMount called');
    // if(this.props.ready){
    //   this.calculateArrivalList(this.props.route, this.props.stop, this.props.beacons);
    // }
 
  }
  
  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps called');
    if(nextProps.ready != this.props.ready ||
       nextProps.beacons != this.props.beacons){
      this.calculateArrivalList(nextProps.route, nextProps.stop, nextProps.beacons);
    }
  }
  
  handleSelectStop(){
    
  }
  
  handleSelectDirection(){
    
  }
  
  calculateArrivalList(route, stop, beacons) {
    console.log('calculateArrivalList called');
    var d = new Date();
    var weekday = d.getDay();
    var destination = `${stop.geometry.coordinates[1]}%2C${stop.geometry.coordinates[0]}`;
    var origins = '';
    let arrivalList = this.state.arrivalList;
    if(!arrivalList || arrivalList.length == 0){
      arrivalList = getTimetableListForStopId(route, stop.stopId); // ignore weekday.
    }
    
    // Fill in beacon info to timetable
    beacons.map(beacon =>{
      origins += `${beacon.geometry.coordinates[1]}%2C${beacon.geometry.coordinates[0]}%7C`
      var timetableItem = arrivalList.find(item => {
        return item.beaconId === beacon.id;
      });
      
      if(timetableItem){
        timetableItem.currentLatitude = beacon.geometry.coordinates[1];
        timetableItem.currentLongitude = beacon.geometry.coordinates[0];
      }
    });
    
    // Find the distance/duration.
    var url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destination}&mode=walking&key=AIzaSyCRb0RF6LvmZNg9iTUwcQOOTntME8nE2jc`
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var counter = 0;
        responseJson.rows.map(item => {
          let element = item.elements[0];
          if(element && element.status === 'OK') {
            var distance = element.distance.text.split(" ");
            var duration = element.duration.text.split(" ");
            arrivalList[counter].estimatedDistance = distance[0];
            arrivalList[counter].estimatedDistanceUnit = distance[1];
            if(duration.length == 2)
            {
              arrivalList[counter].estimatedArrivalInHours = null;
              arrivalList[counter].estimatedArrivalInMin = duration[0];
            }
            else if(duration.length == 4){
              arrivalList[counter].estimatedArrivalInHours = duration[0];
              arrivalList[counter].estimatedArrivalInMin = duration[2];
            }
          }
          else {
            arrivalList[counter].estimatedDistance = '-';
            arrivalList[counter].estimatedArrivalInMin = '-';
          }
          counter++;
        });
        this.setState({arrivalList: arrivalList});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  render(){
    const {ready} = this.props;
    return (
      <RouteTracker
        ready={ready}
        currentStop={this.props.stop.name}
        direction={this.props.route.direction}
        onSelectStop={this.handleSelectStop.bind(this)}
        onPressSelectDirection={this.handleSelectDirection.bind(this)}
        arrivalList={this.state.arrivalList} />
    );
  }
}

RouteTracker.propTypes = {
  ready: React.PropTypes.bool,
  stop: React.PropTypes.object,
  route: React.PropTypes.object,
  beacons: React.PropTypes.array
};

export default createContainer(params => {
  console.log('createContainer called');
  var stop = params.stop;
  var route = params.route;
  var beaconIdList = getBeaconList(route);
  var beaconId = beaconIdList.shift();
  const handle = Meteor.subscribe('beacon-by-id', {beaconId});
  return{
    ready: handle.ready(),
    stop: stop,
    route: route,
    beacons: [Meteor.collection('beacons').findOne()]
  }
  // const handle = Meteor.subscribe('beacons-by-idlist', {beaconIdList});
  // return{
  //   ready: handle.ready(),
  //   stop: stop,
  //   route: route,
  //   beacons: Meteor.collection('beacons').find({ beaconId: { $in: beaconIdList } })
  // }
}, RouteTrackerContainer);