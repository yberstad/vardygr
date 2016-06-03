import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventListView from '../components/EventListView';



export default class EventListViewContainer extends Component {
    render() {
        <EventListView {... this.props } />
    }
}

const mapStateToProps = (state) => {
    return {
        eventList: state.get('eventList').eventList    
    };
};

export default connect(mapStateToProps)(EventListViewContainer);