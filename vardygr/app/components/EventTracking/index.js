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


export default class EventTracking extends Component
{
    constructor(props){
        super(props);

        this.state = {
            markers: [],
            positions: null,
            region: new Animated.Region({
                longitude: props.currentEvent.location.coordinates[0],
                latitude: props.currentEvent.location.coordinates[1],
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }),
            zoomEnabled: true
        };
    }
    componentWillMount() {
        this.makeSubscription();
        this.observeLocations();
    }

    makeSubscription() {
        ddpClient.subscribe("positions", [this.props.currentEvent._id] , () => {
            console.log('subscribe-add: ' + JSON.stringify(ddpClient.collections.positions) + ' eventId:n' + this.props.currentEvent._id);
            this.setState({positions: ddpClient.collections.positions});
        });
    }

    observeLocations() {
        var _this = this;
        let observer = ddpClient.observe("positions");
        observer.added = (id) => {
            console.log('observe-add: ' + JSON.stringify(ddpClient.collections.positions) + ' eventId:n' + this.props.currentEvent._id);
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
            marker.id = position.id;
            list.push(marker);
        }
        return list;
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render(){
        return (
            <View style={styles.container}>
                <MapView.Animated
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
                </MapView.Animated>
            </View>
        );
    }
}