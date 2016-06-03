import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventTracking from '../components/EventTracking';
import { createStructuredSelector } from 'reselect';
import appState from '../selectors/appState';
import currentEvent from '../selectors/currentEvent';

const selectors = {
    appState,
    currentEvent
}

export default class EventTrackingContainer extends Component {
    render(){
        return <EventTracking {... this.props}/>
    }
}

export default connect(createStructuredSelector(selectors))(EventTrackingContainer);