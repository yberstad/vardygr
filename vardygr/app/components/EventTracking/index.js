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
            positions: null,
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
            displayMode: 'PORTRAIT'
        };
    }

    componentWillMount() {
        this.makeSubscription();
        this.observeLocations();
    }

    componentWillUnmount(){
        observer.stop();
    }

    makeSubscription() {
        var _this = this;
        ddpClient.subscribe("positions", [_this.props.currentEvent._id] , () => {
            console.log('subscribe-add: ' + JSON.stringify(ddpClient.collections.positions) + ' eventId:n' + _this.props.currentEvent._id);
            _this.setState({positions: ddpClient.collections.positions});
            _this.setState({markers: _this.getMarkerList(ddpClient.collections.positions)});
        });
    }

    observeLocations() {
        var _this = this;
        observer = ddpClient.observe("positions");
        observer.added = (id) => {
            console.log('observe-add: ' + JSON.stringify(ddpClient.collections.positions) + ' eventId:n' + _this.props.currentEvent._id);
            _this.setState({positions: ddpClient.collections.positions})
            _this.setState({markers: _this.getMarkerList(ddpClient.collections.positions)});
        }
        observer.changed = (id, oldFields, clearedFields, newFields) => {
            console.log('observe-changed: ' + JSON.stringify(ddpClient.collections.positions));
            _this.setState({positions: ddpClient.collections.positions})
            _this.setState({markers: _this.getMarkerList(ddpClient.collections.positions)});
        }
        observer.removed = (id, oldValue) => {
            console.log('observe-removed: ' + JSON.stringify(ddpClient.collections.positions));
            _this.setState({positions: ddpClient.collections.positions})
        }

    }

    getMarkerList(collection) {
        var list = [];
        for (var id in collection) {
            var position = collection[id];
            var marker = {};
            marker.latlng = {
                longitude: position.coordinates[0],
                latitude: position.coordinates[1]
            };
            marker.title = position.createdBy;
            marker.description = position.createdBy;
            marker.id = position._id;
            list.push(marker);
        }
        return list;
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    onLayoutChanged(event){
        const { width, height } = event.nativeEvent.layout;
        const orientation = (width > height) ? 'LANDSCAPE' : 'PORTRAIT';
        if(orientation == 'LANDSCAPE'){
            this.getDistancesFromApiAsync(orientation, this.state.region, this.state.markers)
        }
        else{
            this.setState({displayMode: orientation});
        }

    }

    getDistancesFromApiAsync(orientation, region, markers) {
        var _this = this;
        var destination = `${region.latitude}%2C${region.longitude}`;
        var origins = '';
        markers.map(marker =>{
            origins += `${marker.latlng.latitude}%2C${marker.latlng.longitude}%7C`
        })
        var url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destination}&key=AIzaSyCRb0RF6LvmZNg9iTUwcQOOTntME8nE2jc`
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                var elements = [];
                responseJson.rows.map(item =>{elements.push(item.elements[0])});
                this.setState({displayMode: orientation, elements: elements});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(){
        let view = '';
        if(this.state.displayMode == 'PORTRAIT')
        {
            view = <MapView
                ref="map"
                style={styles.map}
                region={this.state.region}
                onRegionChange={(region) => this.onRegionChange(region)}
                zoomEnabled={this.state.zoomEnabled}
            >
                {this.state.markers.map(marker => (
                    <MapView.Marker
                        coordinate={marker.latlng}
                        title={marker.title}
                        description={marker.description}
                        key={marker.id}
                    />
                ))}
            </MapView>
        }
        else{
            let distance = '';
            this.state.elements.map(element => {
                distance = `distance: ${element.distance.text} <br /> `
            })
            view = <Text>{distance}</Text>
        }
        return (
            <View style={styles.container} onLayout={(event) => this.onLayoutChanged(event)}>
                {view}
            </View>
        );
    }
}