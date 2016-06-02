import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendSelect from '../components/FriendSelect';
import eventEditSelectParticipants from '../actions/eventEditSelectParticipants';
import { bindActionCreators } from 'redux';
import participantsToFriendSelect from '../selectors/participantsToFriendSelect';

export default class EventEditSelectParticipantsContainer extends Component {
    render(){
        return <FriendSelect {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        selectedFriends: participantsToFriendSelect,
        connected: state.get('app').connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectFriends: bindActionCreators(eventEditSelectParticipants, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEditSelectParticipantsContainer);