import React, { Component } from 'react';
import { connect } from 'react-redux';
import Launch from '../components/Launch';

export default class LaunchContainer extends Component{
    render(){
        return (
            <Launch {... this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        signedIn: state.get('currentUser').signedIn
    }
}
export default connect(mapStateToProps)(LaunchContainer);