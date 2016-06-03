import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import EventListView from '../components/EventListView';
import eventSetCurrent from '../actions/eventSetCurrent';

const actions = {
    eventSetCurrent
}

export default class HomeContainer extends Component{
    render(){
        return (
            <EventListView {... this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        eventList: state.get('eventList').eventList
    }
}

export default connect(mapStateToProps, actions)(HomeContainer);