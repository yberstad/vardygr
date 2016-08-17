import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocationSelect from '../components/LocationSelect';
import eventEditSelectLocation from '../actions/eventEditSelectLocation';
import { bindActionCreators } from 'redux';

export default class EventEditSelectLocationContainer extends Component {
    render(){
        return <LocationSelect {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    let longitude = state.get('app').longitude;
    let latitude = state.get('app').latitude;
    if(state.get('currentEvent').location.coordinates.length == 2)
    {
        longitude = state.get('currentEvent').location.coordinates[0];
        latitude = state.get('currentEvent').location.coordinates[1];
    }
    return {
        longitude: longitude,
        latitude: latitude,
        connected: state.get('app').connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectLocation: bindActionCreators(eventEditSelectLocation, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditSelectLocationContainer);