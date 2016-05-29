import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocationSelect from '../components/LocationSelect';
import eventCreateSelectLocation from '../actions/eventCreateSelectLocation';
import { bindActionCreators } from 'redux';

export default class EventCreateSelectLocationContainer extends Component {
    render(){
        return <LocationSelect {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    let longitude = state.get('app').longitude;
    let latitude = state.get('app').latitude;
    if(state.get('createEvent').location.coordinates.length == 2)
    {
        longitude = state.get('createEvent').location.coordinates[0];
        latitude = state.get('createEvent').location.coordinates[0];
    }
    return {
        longitude: longitude,
        latitude: latitude,
        connected: state.get('app').connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectLocation: bindActionCreators(eventCreateSelectLocation, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateSelectLocationContainer);