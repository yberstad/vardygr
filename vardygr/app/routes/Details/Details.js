import React, { PropTypes } from 'react';
import { Text, View, TextInput } from 'react-native';
import Button from '../../components/Button';
import Meteor, { MeteorComplexListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';

function renderRow(beacon) {
    return <Text style={styles.item}>
        beaconId -> {beacon.beaconId}:
        {beacon.geometry.coordinates[0]}:
        {beacon.geometry.coordinates[1]} </Text>;
}

function renderItem(stop) {
    return <Text key={stop._id} style={styles.item}>{stop.name}</Text>;
}

function renderStop() {

}

const Details = ({
    updateState,
    detailsReady,
    onFindNearStop,
    nearStop,
    searchStops,
    searchStopsResult,
    beacon}) =>
{
    if (!detailsReady) {
        return <Loading />;
    }

    let result;
    if(searchStopsResult){
        result = searchStopsResult.map(stop =>{
            return renderItem(stop);
        });
    }

    return (
        <View style={styles.container}>
            
            <Text>Near stop: {nearStop}</Text>
            <Button
                text="Find near stop"
                onPress={onFindNearStop}
            />
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(searchText) => searchStops(searchText)}/>
            {result}
        </View>
    );
};

Details.propTypes = {
    updateState: React.PropTypes.func,
    detailsReady: React.PropTypes.bool,
    onFindNearStop: React.PropTypes.func,
    nearStop: React.PropTypes.string,
    searchStops: React.PropTypes.func,
    searchStopsResult: React.PropTypes.array,
    beacon: React.PropTypes.object
};

export default Details;
