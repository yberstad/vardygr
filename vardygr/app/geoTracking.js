import React, { Component } from 'react';
import { Text, Platform } from 'react-native';
import {store} from './index';
import appCurrentPosition from './actions/appCurrentPosition';
import positionAdd from './actions/positionAdd';
import {geoLoationConfig} from './config';

// var BackgroundGeolocation = require('react-native-background-geolocation-android');
var BackgroundGeolocation = Platform.select({
   ios: () => require('react-native-background-geolocation'),
   android: () => require('react-native-background-geolocation-android'),
})();

export function startGeoTracking()
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
            store.dispatch(positionAdd(location.coords.longitude, location.coords.latitude));
            store.dispatch(appCurrentPosition(location.coords.longitude, location.coords.latitude));
        });

        // Fetch current position
        BackgroundGeolocation.getCurrentPosition({timeout: 30}, function (location) {
            store.dispatch(appCurrentPosition(location.coords.longitude, location.coords.latitude));
            console.log('BackgroundGeolocation getCurrentPosition received current position: ', JSON.stringify(location));
            resolve(location);
        }, function (error) {
            console.log('Location error: ' + error);
            reject(error);
        });
    });
}