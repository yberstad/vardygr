import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventOverview from '../components/EventOverview';
import { createStructuredSelector } from 'reselect';
import appState from '../selectors/appState';
import currentEvent from '../selectors/currentEvent';

const selectors = {
    appState,
    currentEvent
}

export default class EventOverviewContainer extends Component {
    render(){
        return <EventOverview {... this.props}/>
    }
}

export default connect(createStructuredSelector(selectors))(EventOverviewContainer);
