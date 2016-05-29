import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTimeSelect from '../components/DateTimeSelect';
import eventCreateSelectDateTime from '../actions/eventCreateSelectDateTime';
import { bindActionCreators } from 'redux';

export default class EventCreateSelectDateTimeContainer extends Component {
    render(){
        return <DateTimeSelect {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        dateTime: state.get('createEvent').startDateTime,
        connected: state.get('app').connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectedDateTime: bindActionCreators(eventCreateSelectDateTime, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateSelectDateTimeContainer);