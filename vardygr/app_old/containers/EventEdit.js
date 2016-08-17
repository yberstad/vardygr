import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventDetails from '../components/EventDetails';
import eventSave from '../actions/eventSave';
import eventUpdate from '../actions/eventUpdate';

const actions = {
    eventSave,
    eventUpdate
}

export default class EventEditContainer extends Component {
    render(){
        return <EventDetails {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.get('currentEvent'),
        connected: state.get('app').connected
    }
};

export default connect(mapStateToProps, actions)(EventEditContainer);