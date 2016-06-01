import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from '../components/SignIn';
import signInEmail from '../actions/signInEmail';
import signUpEmail from '../actions/signUpEmail';
import signInFacebook from '../actions/signInFacebook';
import signInFacebookFailure from '../actions/signInFacebookFailure';
import signInFacebookCancelled from '../actions/signInFacebookCancelled';
import signOutFacebook from '../actions/signOutFacebook';

const actions = {
    signInEmail,
    signUpEmail,
    signInFacebook,
    signInFacebookFailure,
    signInFacebookCancelled,
    signOutFacebook
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