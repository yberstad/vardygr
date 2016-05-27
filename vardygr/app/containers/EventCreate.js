import React from 'react';
import { Component } from 'react-native';
import { connect } from 'react-redux';
import EventDetails from '../components/EventDetails';

const actions = {
    eventSave
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