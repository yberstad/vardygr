import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendSelect from '../components/FriendSelect';
import eventEditSelectCoHost from '../actions/eventEditSelectCoHost';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import selectedFriends from '../selectors/coHostsToFriendSelect';
import appState from '../selectors/appState';

const selectors = {
    selectedFriends,
    appState
}

export default class EventEditSelectCoHostsContainer extends Component {
    render(){
        return <FriendSelect {... this.props}/>
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectFriends: bindActionCreators(eventEditSelectCoHost, dispatch)
    }
}

export default connect(createStructuredSelector(selectors), mapDispatchToProps)(EventEditSelectCoHostsContainer);