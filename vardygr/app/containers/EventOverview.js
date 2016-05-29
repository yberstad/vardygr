import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventOverview from '../components/EventOverview';

export default class EventOverviewContainer extends Component {
    render(){
        return <EventOverview {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        event: state.get('currentEvent'),
        connected: state.get('app').connected
    }
};

export default connect(mapStateToProps)(EventOverviewContainer);