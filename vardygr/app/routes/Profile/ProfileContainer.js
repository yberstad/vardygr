import React, { Component } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Profile from './Profile';
import routeData from '../../example.json';
import {getRoute, getReturnRoute, getStops, getBeacons} from '../../Gressbanen-Sagstuga';
import {startBeacon, stopBeacon} from '../../lib/geoTracking';

var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;

const dateTimeReviver = function (key, value) {
    if (typeof value === 'string') {
        var a = reISO.exec(value);
        if (a)
            return new Date(value);
        a = reMsAjax.exec(value);
        if (a) {
            var b = a[1].split(/[-+,.]/);
            return new Date(b[0] ? +b[0] : 0 - +b[1]);
        }
    }
    return value;
}

class ProfileContainer extends Component {
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

    onGetNearStop() {
        var currentPosition = {
            location: {
                type: "Point",
                coordinates: [10.6655679,59.9508496]
            }
        };
        var stopId;
        var routeList;
        Meteor.call('findNearStop', { currentPosition }, (err, result) => {
            if(err) {//save user id and token
                console.log(err);
            }
            stopId = result._id;
            Meteor.call('getRoutList',{stopId}, (err, result1) => {
                if(err) {//save user id and token
                    console.log(err);
                }
                routeList = result1;
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
