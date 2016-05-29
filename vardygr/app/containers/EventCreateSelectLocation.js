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
    return {
        location: state.get('createEvent').location,
        connected: state.get('app').connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectLocation: bindActionCreators(eventCreateSelectLocation, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateSelectLocationContainer);