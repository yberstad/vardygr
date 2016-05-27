import React from 'react';
import { Component } from 'react-native';
import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import signInEmail from '../actions/signInEmail'

const actions = {
    signInEmail,
};

export default class SignInContainer extends Component{
    render(){
        return (
            <SignIn {... this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        connected: state.get('app').connected
    }
}
export default connect(mapStateToProps, actions)(SignInContainer);