import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import RouteSearch from './RouteSearch';
import {getCurrentPosition} from '../../lib/geoTracking';
import Routes from '../../config/routes';

class RouteSearchContainer extends Component {
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
  
  searchForRoute(stop){
    return new Promise((resolve, reject) =>{
      Meteor.call('getRoutListByStopId', {stopId: stop.stopId}, (err, result1) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        this.setState({selectedRoute: result1[0]});
        resolve(result1[0]);
      });
    });
  }
  
  goToRouteTracker(stop) {
    this.searchForRoute(stop).then((route) => {
      this.props.navigator.push(Routes.getRouteTrackerRoute(route, stop));
    });
  }
  
  tryFindNearStop() {
    return new Promise((resolve, reject) => {
      getCurrentPosition().then((geometry) => {
        Meteor.call('findNearStop', {geometry : geometry}, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(result);
        });
      });
    });
  }
  
  searchStops(searchString){
    this.tryFindNearStop().then(nearStop => {
      Meteor.call('searchStopsByRegex', {searchString: searchString}, (err, result) => {
        if(nearStop)
        {
          result.push(nearStop);
        }
        this.setState({searchStopsResult: result});
      });
    }).catch(error => {
      console.log(error);
    });

  }
  
  render(){
    const {detailsReady} = this.props;
    return (
      <RouteSearch
        updateState={this.setState.bind(this)}
        detailsReady={detailsReady}
        goToRouteTracker={this.goToRouteTracker.bind(this)}
        nearStop={this.state.nearStop}
        searchStops={this.searchStops.bind(this)}
        searchStopsResult={this.state.searchStopsResult}
      />
    );
  }
};

RouteSearchContainer.propTypes = {
  detailsReady: React.PropTypes.bool,
  navigator: React.PropTypes.object,
};

export default createContainer((params) => {
  //var navigator = params.navigator
  //const handler = Meteor.subscribe('beacons-by-id', { beaconId: 'beaconId_1'});
  return {
    detailsReady: true,//handler.ready(),
  };
}, RouteSearchContainer);
