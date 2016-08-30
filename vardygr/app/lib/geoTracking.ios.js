import {geoLoationConfig} from '../config/settings';
import Meteor from 'react-native-meteor';

var BackgroundGeolocation = require('react-native-background-geolocation');

export function startBeacon(beaconId)
{
    return  new Promise((resolve, reject) => {
        BackgroundGeolocation.configure(geoLoationConfig(), function (state) {
            // Plugin is ready to use.
            if (!state.enabled) {
                BackgroundGeolocation.start(function () {
                    console.log('BackgroundGeolocation started successfully');
                    BackgroundGeolocation.changePace(true);
                });
            }
        });

        // This handler fires whenever bgGeo receives a location update.
        BackgroundGeolocation.on('location', function (newLoacation) {
            console.log('BackgroundGeolocation on-method received current position: ', JSON.stringify(location));

            var location = {
                type: "Point",
                coordinates: [newLoacation.coords.longitude, newLoacation.coords.latitude]
            };

            Meteor.call('updateBeacon', {beaconId, location}, (err, result) => {
                if(err){
                    console.log(err)
                }
            });
        });
    });
}

export function stopBeacon() {
    BackgroundGeolocation.stop();
}

export function getCurrentPosition() {
    return  new Promise((resolve, reject) => {
        // Fetch current position
        BackgroundGeolocation.getCurrentPosition({timeout: 30}, function (newLocation) {
            console.log('BackgroundGeolocation getCurrentPosition received current position: ', JSON.stringify(newLocation));
            var location = {
                type: "Point",
                coordinates: [newLocation.coords.longitude, newLocation.coords.latitude]
            };
            resolve(location);
        }, function (error) {
            console.log('Location error: ' + error);
            reject(error);
        });
    });
}