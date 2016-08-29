import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Details from './Details';

const DetailsContainer = ({ detailsReady }) => {
  return (
    <Details
      detailsReady={detailsReady}
    />
  );
};

DetailsContainer.propTypes = {
  detailsReady: PropTypes.bool,
};

export default createContainer(() => {
  const handle = Meteor.subscribe('beacons-by-id', { beaconId: 'beaconId_1'});
  return {
    detailsReady: handle.ready(),
  };
}, DetailsContainer);
