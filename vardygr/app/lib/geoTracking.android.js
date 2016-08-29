import {geoLoationConfig} from '../config/settings';
import Meteor from 'react-native-meteor';

var BackgroundGeolocation = require('react-native-background-geolocation-android');

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
        BackgroundGeolocation.on('location', function (location) {
            console.log('BackgroundGeolocation on-method received current position: ', JSON.stringify(location));

            var location = {
                type: "Point",
                coordinates: [location.coords.longitude, location.coords.latitude]
            };

            Meteor.call('updateBeacon', {beaconId, location}, (err, result) => {
                if(err){
                    console.log(err)
                }
            });
        });
    });
}