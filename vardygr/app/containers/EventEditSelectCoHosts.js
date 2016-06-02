import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendSelect from '../components/FriendSelect';
import eventEditSelectCoHost from '../actions/eventEditSelectCoHost';
import { bindActionCreators } from 'redux';

export default class EventEditSelectCoHostsContainer extends Component {
    render(){
        return <FriendSelect {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        selectedFriends: state.get('currentEvent').coHosts,
        connected: state.get('app').connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectFriends: bindActionCreators(eventEditSelectCoHost, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventEditSelectCoHostsContainer);