import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendSelect from '../components/FriendSelect';
import eventCreateSelectCoHost from '../actions/eventCreateSelectCoHost';
import { bindActionCreators } from 'redux';

export default class EventCreateSelectCoHostsContainer extends Component {
    render(){
        return <FriendSelect {... this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        selectedFriends: state.get('createEvent').coHosts,
        connected: state.get('app').connected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectFriends: bindActionCreators(eventCreateSelectCoHost, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EventCreateSelectCoHostsContainer);