import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Details from './Details';
import {getCurrentPosition} from '../../lib/geoTracking';
import Routes from '../../config/routes';

class DetailsContainer extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      nearStop: '',
      searchStopsResult: null,
      selectedStop: null,
      selectedRoute: null
    };
    this.tryFindNearStop.bind(this);
  }
  
  componentWillMount() {
    this.tryFindNearStop().then((error, stop) => {
      if (error) {
        console.log(error);
      }
      if (stop) {
        this.setState({selectedStop: stop});
        let stopId = stop.stopId;
        Meteor.call('getRoutListByStopId', {stopId}, (err, result1) => {
          if (err) {
            console.log(err);
          }
          this.setState({selectedRoute: result1[0]});
        });
      }
      else {
        Meteor.call('findStopByStopId', {stopId: 'stopId_2'}, (error, stop) => {
          if (error) {
            console.log(error);
          }
          if (stop) {
            this.setState({selectedStop: stop});
            Meteor.call('getRoutListByStopId', {stopId : stop.stopId}, (err, result1) => {
              if (err) {
                console.log(err);
              }
              this.setState({selectedRoute: result1[0]});
            });
          }
        });
      }
    });
  }
  
  findNearStop() {
    this.props.navigator.push(Routes.getRouteTrackerRoute(this.state.selectedRoute, this.state.selectedStop));
  }
  
  tryFindNearStop() {
    return new Promise((resolve, reject) => {
      getCurrentPosition().then((location) => {
        Meteor.call('findNearStop', {location}, (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      });
    });
  }
  
  
  
  searchStops(searchString){
    Meteor.call('searchStops', {searchString}, (err, result) => {
      this.setState({searchStopsResult: result});
    });
  }
  
  render(){
    const {detailsReady, beacon} = this.props;
    return (
      <Details
        updateState={this.setState.bind(this)}
        detailsReady={detailsReady}
        onFindNearStop={this.findNearStop.bind(this)}
        nearStop={this.state.nearStop}
        searchStops={this.searchStops.bind(this)}
        searchStopsResult={this.state.searchStopsResult}
        beacon={beacon}
      />
    );
  }
};

DetailsContainer.propTypes = {
  detailsReady: React.PropTypes.bool,
  beacon: React.PropTypes.object,
  navigator: React.PropTypes.object,
};

export default createContainer((params) => {
  //var navigator = params.navigator
  //const handler = Meteor.subscribe('beacons-by-id', { beaconId: 'beaconId_1'});
  return {
    detailsReady: true,//handler.ready(),
    beacon: {}//Meteor.collection('beacons').findOne()
  };
}, DetailsContainer);
