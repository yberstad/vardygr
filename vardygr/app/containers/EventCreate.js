import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventDetails from '../components/EventDetails';
import eventSave from '../actions/eventSave';

const actions = {
    eventSave,
}

export default class EventCreateContainer extends Component {
    render(){
        return <EventDetails {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.get('createEvent'),
        connected: state.get('app').connected
    }
};

export default connect(mapStateToProps, actions)(EventCreateContainer);