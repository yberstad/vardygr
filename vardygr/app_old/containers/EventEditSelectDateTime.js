import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTimeSelect from '../components/DateTimeSelect';
import eventEditSelectDateTime from '../actions/eventEditSelectDateTime';
import { bindActionCreators } from 'redux';

export default class EventEditSelectDateTimeContainer extends Component {
    render(){
        return <DateTimeSelect {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        dateTime: state.get('currentEvent').startDateTime,
        connected: state.get('app').connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectedDateTime: bindActionCreators(eventEditSelectDateTime, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditSelectDateTimeContainer);