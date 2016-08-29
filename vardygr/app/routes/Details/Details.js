import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';

function renderRow(beacon) {
    return <Text style={styles.item}>
        {beacon.geometry.coordinates[0]}:
        {beacon.geometry.coordinates[1]} </Text>;
}

const Details = ({ detailsReady }) => {
  if (!detailsReady) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <MeteorListView
        contentContainerStyle={styles.list}
        collection="beacons"
        renderRow={renderRow}
      />
    </View>
  );
};

Details.propTypes = {
  detailsReady: PropTypes.bool,
};

export default Details;
