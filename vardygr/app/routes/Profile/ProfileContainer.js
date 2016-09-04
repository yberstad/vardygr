import React, { Component } from 'react';
import Meteor, {createContainer} from 'react-native-meteor';
import Profile from './Profile';
import {getRoute, getReturnRoute, getStops, getBeacons} from '../../Gressbanen-Sagstuga';
import {startBeacon, stopBeacon} from '../../lib/geoTracking';

class ProfileContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      route: null,
      stop: null,
    };
  }
  
  componentWillMount(){
    
  }
  
  handleSignOut() {
    Meteor.logout();
  }
  
  onInsertTestDataPress(){
    this.insertStops();
    this.insertBeacons();
    this.insertRoutes();
  }
  
  insertStops(){
    var stops = getStops();
    stops.map(stop => {
      Meteor.call('insertStop', { stop }, (err, result) => {
        if(err) {//save user id and token
          console.log(err);
        }
      });
    });
  }
  
  insertRoutes() {
    var route = getRoute();
    Meteor.call('insertRoute', { route }, (err, result) => {
      if(err) {//save user id and token
        console.log(err);
      }
    });
    
    route = getReturnRoute();
    Meteor.call('insertRoute', { route }, (err, result) => {
      if(err) {//save user id and token
        console.log(err);
      }
    });
  }
  
  insertBeacons(){
    var beacons = getBeacons();
    beacons.map(beacon => {
      Meteor.call('insertBeacon', { beacon }, (err, result) => {
        if(err) {//save user id and token
          console.log(err);
        }
      });
    });
  }
  
  onStartBeacon1Press() {
    startBeacon('beaconId_1');
  }
  
  onStopBeaconPress() {
    stopBeacon();
  }
  
  render() {
    const { user } = this.props;
    
    return (
      <Profile
        user={user}
        signOut={this.handleSignOut.bind(this)}
        onInsertTestDataPress={this.onInsertTestDataPress.bind(this)}
        onStartBeacon1Press={this.onStartBeacon1Press.bind(this)}
        onStopBeaconPress={this.onStopBeaconPress.bind(this)}
      />
    );
  }
}

ProfileContainer.propTypes = {
  user: React.PropTypes.object,
};

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, ProfileContainer);
