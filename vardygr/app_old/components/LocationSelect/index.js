import React, {Component} from 'react';
import {
    Dimensions,
    View,
    StyleSheet,
    Platform,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';
import Button from '../Button';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var MapView = require('react-native-maps');

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0822;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


const homePlace = {description: 'Home', geometry: {location: {lat: 48.8152937, lng: 2.4597668}}};
const workPlace = {description: 'Work', geometry: {location: {lat: 48.8496818, lng: 2.2940881}}};

export default class LocationSelect extends Component {
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
            lastPosition: 'unknown',
            containerZindex: -1
        };

    }

    validInput() {
        return true;
    }

    handleOk() {
        if (this.validInput()) {
            this.props.selectLocation(
                this.state.marker.longitude,
                this.state.marker.latitude,
                this.state.region.longitudeDelta,
                this.state.region.latitudeDelta,
            );
            Actions.pop();
        }
    }

    getRegion() {
        return (this.props.regionForEvent) ? this.props.regionForEvent : this.state.region;
    }

    onMapPress(e) {
        console.log(e.nativeEvent.coordinate);

        // var { marker } = this.state;
        // marker.timing({
        //     longitude: e.nativeEvent.coordinate.longitude,
        //     latitude: e.nativeEvent.coordinate.latitude
        // }).start();

        var marker = {
            longitude: e.nativeEvent.coordinate.longitude,
            latitude: e.nativeEvent.coordinate.latitude
        };

        this.setState({marker});
        
    }


    onRegionChange(region) {
        this.setState({region});
    }

    onLocationChange(details) {
        var region = {
            longitude: details.geometry.location.lng,
            latitude: details.geometry.location.lat,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        };
        var marker = {
            longitude: region.longitude,
            latitude: region.latitude
        };
        this.setState({region, marker});
    }

    getRegionAsText() {
        return this.state.region.latitude + ', ' + this.state.region.longitude + ', ' + this.state.region.latitudeDelta + ', ' + this.state.region.longitudeDelta;
    }

    render() {
        let ok;

        if (this.props.connected) {
            ok = <Button text="OK" onPress={() => this.handleOk()}/>;
        }
        let _this = this;
        return (

            <View style={styles.container}>

                <GooglePlacesAutocomplete
                    ref="autoComplete"
                    enablePoweredByContainer={false}
                    currentLocation={true}
                    placeholder='Search'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    fetchDetails={true}
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(data);
                        console.log(details);
                        this.onLocationChange(details);
                        _this.setState({containerZindex: -1})
                    }}
                    getDefaultValue={() => {
                        return ''; // text input default value
                    }}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyCccuHjeJfpBgGiURzgz6VTReyZbcAjp-A',
                        language: 'en', // language of the results
                        types: ['geocode','establishment'], // default: 'geocode'
                    }}
                    styles={{
                        textInputContainer: {
                            marginTop: 60
                        },
                        row: {
                            backgroundColor: '#FFFFFF'
                        },
                        container: {
                            zIndex: this.state.containerZindex
                        }
                    }}
                    textInputProps={{
                        onChangeText: (text) => {
                            console.log(text);
                            _this.setState({containerZindex: 100})
                        }
                    }}

                    currentLocationLabel="Places near by"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        rankby: 'distanceFromStop',
                        types: 'food',
                    }}


                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    predefinedPlaces={[homePlace, workPlace]}
                />

                <View style={styles.map_container}>
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

                </View>

                {ok}
            </View>
        );
    }
}