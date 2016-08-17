import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendSelect from '../components/FriendSelect';
import eventEditSelectParticipants from '../actions/eventEditSelectParticipants';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import selectedFriends from '../selectors/participantsToFriendSelect';
import appState from '../selectors/appState';

const selectors = {
    selectedFriends,
    appState
}

export default class EventEditSelectParticipantsContainer extends Component {
    render(){
        return <FriendSelect {... this.props}/>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectFriends: bindActionCreators(eventEditSelectParticipants, dispatch)
    }
}

export default connect(createStructuredSelector(selectors), mapDispatchToProps)(EventEditSelectParticipantsContainer);