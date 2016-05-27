import React from 'react';
import { Component } from 'react-native';
import { connect } from 'react-redux';
import EventDetails from '../components/EventDetails';

const actions = {
    eventUpdate
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