import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendSelect from '../components/FriendSelect';
import eventCreateSelectParticipants from '../actions/eventCreateSelectParticipants';
import { bindActionCreators } from 'redux';

export default class EventCreateSelectParticipantsContainer extends Component {
    render(){
        return <FriendSelect {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        selectedFriends: state.get('createEvent').participants,
        connected: state.get('app').connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectFriends: bindActionCreators(eventCreateSelectParticipants, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateSelectParticipantsContainer);