import React, { Component } from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    Animated } from 'react-native';
import Button from '../Button';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
var MapView = require('react-native-maps');

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class LocationSelect extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            marker: {
                longitude: props.longitude,
                latitude: props.latitude
            },
            region: {
                longitude: props.longitude,
                latitude: props.latitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            zoomEnabled: true,
            initialPosition: 'unknown',
            lastPosition: 'unknown'
        };
    }

    validInput() {
        return true;
    }

    handleOk() {
        if (this.validInput()) {
            this.props.selectLocation(
                this.state.marker.longitude._value,
                this.state.marker.latitude._value,
                this.state.region.longitudeDelta,
                this.state.region.latitudeDelta,
            );
            Actions.pop();
        }
    }

    getRegion(){
        return (this.props.regionForEvent) ? this.props.regionForEvent : this.state.region;
    }

    onMapPress(e) {
        console.log(e.nativeEvent.coordinate);

        var { marker } = this.state;
        marker.timing({
            longitude: e.nativeEvent.coordinate.longitude,
            latitude: e.nativeEvent.coordinate.latitude
        }).start();
    }


    onRegionChange(region) {
        this.setState({ region });
    }

    getRegionAsText()
    {
        return this.state.region.latitude + ', ' + this.state.region.longitude + ', ' + this.state.region.latitudeDelta+ ', ' +this.state.region.longitudeDelta;
    }

    render(){
        let ok;

        if (this.props.connected) {
            ok = <Button text="OK" onPress={() => this.handleOk()}/>;
        }

        return (
            <View style={styles.container}>
                <MapView
                    ref="map"
                    style={styles.map}
                    region={this.getRegion()}
                    onRegionChange={(region) => this.onRegionChange(region)}
                    zoomEnabled={this.state.zoomEnabled}
                    onPress={(e) => this.onMapPress(e)}
                >
                    <MapView.Marker.Animated
                        coordinate={this.state.marker}
                    />
                </MapView>

                {ok}
            </View>
        );
    }
}