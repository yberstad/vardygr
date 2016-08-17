import React, { Component } from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    Animated } from 'react-native';
import ddpClient from '../../ddp';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
var MapView = require('react-native-maps');

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var observer = null;

export default class EventTracking extends Component
{
    constructor(props){
        super(props);

        this.state = {
            markers: [],
            beacons: null,
            // region: new Animated.Region({
            //     longitude: props.currentEvent.location.coordinates[0],
            //     latitude: props.currentEvent.location.coordinates[1],
            //     latitudeDelta: LATITUDE_DELTA,
            //     longitudeDelta: LONGITUDE_DELTA
            // }),
            region: {
                longitude: props.currentEvent.location.coordinates[0],
                latitude: props.currentEvent.location.coordinates[1],
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            zoomEnabled: true,
            displayMode: 'PORTRAIT',
            myPosition: null
        };
    }

    componentWillMount() {
        this.makeSubscription();
        //this.observeLocations();
    }

    componentWillUnmount(){
        //observer.stop();
    }

    makeSubscription() {
        var _this = this;
        var facebookIdList = [];
        _this.props.currentEvent.participants.map(participant => {
            facebookIdList.push(participant.facebookId)
        });
        ddpClient.subscribe("beacons-by-facebookid", {facebookIdList} , () => {
            console.log('subscribe-add: ' + JSON.stringify(ddpClient.collections.beacons) + ' eventId:n' + _this.props.currentEvent._id);
            _this.setState({beacons: ddpClient.collections.beacons});
            _this.setState({markers: _this.getMarkerList(ddpClient.collections.beacons, _this.props.currentEvent)});
        });
    }

    observeLocations() {
        var _this = this;
        observer = ddpClient.observe("beacons-by-facebookid");
        observer.added = (id) => {
            console.log('observe-add: ' + JSON.stringify(ddpClient.collections.beacons) + ' eventId:n' + _this.props.currentEvent._id);
            _this.setState({beacons: ddpClient.collections.beacons})
            _this.setState({markers: _this.getMarkerList(ddpClient.collections.beacons, _this.props.currentEvent)});
        }
        observer.changed = (id, oldFields, clearedFields, newFields) => {
            console.log('observe-changed: ' + JSON.stringify(ddpClient.collections.beacons));
            _this.setState({beacons: ddpClient.collections.beacons})
            _this.setState({markers: _this.getMarkerList(ddpClient.collections.beacons, _this.props.currentEvent)});
        }
        observer.removed = (id, oldValue) => {
            console.log('observe-removed: ' + JSON.stringify(ddpClient.collections.positions));
            _this.setState({positions: ddpClient.collections.positions})
        }

    }

    getMarkerList(collection, currentEvent) {
        var list = [];
        for (var id in collection) {
            var beacon = collection[id];
            var marker = {};
            marker.latlng = {
                longitude: beacon.coordinates[0],
                latitude: beacon.coordinates[1]
            };
            var participant = _.find(currentEvent.participants, (p) => {
                return p.facebookId === beacon.createdByFacebookId
            });
            if(participant) {
                marker.title = participant.displayName;
                marker.id = beacon._id;
                marker.facebookId = participant.facebookId
                list.push(marker);
            }
        }
        var eventMarker = {
            title: 'Destination',
            description: currentEvent.title,
            id: currentEvent._id,
            facebookId: 0
        };
        eventMarker.latlng = {
            longitude: currentEvent.location.coordinates[0],
            latitude: currentEvent.location.coordinates[1]
        };
        list.push(eventMarker);

        return list;
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    onLayoutChanged(event){
        const { width, height } = event.nativeEvent.layout;
        const orientation = (width > height) ? 'LANDSCAPE' : 'PORTRAIT';
        if(orientation == 'LANDSCAPE'){
            this.getDistancesFromApiAsync(orientation, this.props.currentEvent, this.state.markers)
        }
        else{
            this.setState({displayMode: orientation});
        }

    }

    getDistancesFromApiAsync(orientation, currentEvent, markers) {
        var _this = this;
        var destination = `${currentEvent.location.coordinates[1]}%2C${currentEvent.location.coordinates[0]}`;
        var origins = '';
        var distanceList = [];
        markers.map(marker =>{
            if(marker.facebookId !== 0)
            {
                origins += `${marker.latlng.latitude}%2C${marker.latlng.longitude}%7C`
                var distance = {
                    facebookId: marker.facebookId,
                    title: marker.title,
                    id: marker.id,
                    latitude: marker.latlng.latitude,
                    longitude: marker.latlng.longitude,
                    distance: '',
                    duration: ''
                }
                distanceList.push(distance)
            }
        })
        var url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destination}&key=AIzaSyCRb0RF6LvmZNg9iTUwcQOOTntME8nE2jc`
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                var counter = 0;
                responseJson.rows.map(item => {
                    distanceList[counter].distance = item.elements[0].distance.text;
                    distanceList[counter].duration = item.elements[0].duration.text;
                    counter++;
                });
                this.setState({displayMode: orientation, distanceList: distanceList});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(){
        let view = '';
        let visibleMarkers = [];
        this.state.markers.map(marker => {
            if(marker.facebookId !== this.props.currentUser.services.facebook.id) {
                visibleMarkers.push(marker);
            }
        });

        if(this.state.displayMode == 'PORTRAIT')
        {
            view =
                <View style={styles.container} onLayout={(event) => this.onLayoutChanged(event)}>
                    <MapView
                        ref="map"
                        style={styles.map}
                        region={this.state.region}
                        onRegionChange={(region) => this.onRegionChange(region)}
                        zoomEnabled={this.state.zoomEnabled}
                        showsUserLocation={true}
                    >
                        { visibleMarkers.map(marker => (
                            <MapView.Marker
                                coordinate={marker.latlng}
                                title={marker.title}
                                description={marker.description}
                                key={marker.id}
                            />
                        ))}
                    </MapView>
                 </View>
        }
        else{
            view = <View style={styles.container} onLayout={(event) => this.onLayoutChanged(event)}>
                {this.state.distanceList.map(distance => (
                    <Text key={distance.id}>{distance.title} distance: {distance.distance}</Text>
                ))}
            </View>
        }
        return (
            view
        );
    }
}