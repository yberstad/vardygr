import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventDetails from '../components/EventDetails';
import eventUpdate from '../actions/eventUpdate';
import eventSelectCoHost from '../actions/eventCreateSelectCoHost';
import eventSelectDateTime from '../actions/eventCreateSelectDateTime';
import eventSelectLocation from '../actions/eventCreateSelectLocation';
import eventSelectParticipants from '../actions/eventCreateSelectParticipants';

const actions = {
    eventUpdate,
    eventSelectCoHost,
    eventSelectDateTime,
    eventSelectLocation,
    eventSelectParticipants
}

export default class EventDetailsContainer extends Component {
    render(){
        return <EventDetails {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.get('currentEvent')
    }
};

export default connect(mapStateToProps, actions)(EventDetailsContainer);