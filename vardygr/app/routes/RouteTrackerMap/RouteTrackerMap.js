import React, { Component } from 'react';
import {
    Dimensions,
    View,
    StyleSheet} from 'react-native';
import styles from './styles';
var MapView = require('react-native-maps');

var {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const RoutTrackerMap = ({ lineString, markers, region, onRegionChange, onLayoutChanged }) => {
   return(
       <View style={styles.container} onLayout={(event) => onLayoutChanged(event)}>
           <MapView
               ref="map"
               style={styles.map}
               region={region}
               onRegionChange={(region) => onRegionChange(region)}
               zoomEnabled={this.state.zoomEnabled}
               showsUserLocation={true}
           >
               { markers.map(marker => (
                   <MapView.Marker
                       coordinate={marker.latlng}
                       title={marker.title}
                       description={marker.description}
                       key={marker.id}
                   />
               ))}

               <MapView.Polyline
                   coordiants={lineString}
               />
           </MapView>
       </View>
   );
};

RouteTracker.protoTypes = {
    lineString: React.PropTypes.array,
    markers: React.PropTypes.array,
    region: React.PropTypes.object,
    onRegionChange: React.PropTypes.func,
    onLayoutChanged: React.prototype.func,
}

export default RoutTrackerMap;