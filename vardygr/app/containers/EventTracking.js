import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventTracking from '../components/EventTracking';

export default class EventTrackingContainer extends Component {
    render(){
        return <EventTracking {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.get('currentEvent')
    }
};

export default connect(mapStateToProps)(EventTrackingContainer);