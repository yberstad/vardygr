import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import signInEmail from '../actions/signInEmail';
import signUpEmail from '../actions/signUpEmail';

const actions = {
    signInEmail,
    signUpEmail,
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