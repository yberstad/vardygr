import React, { Component } from 'react';
import { LayoutAnimation, AsyncStorage } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';
import SignIn from './SignIn';
import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';

const USER_TOKEN_KEY = 'reactnativemeteor_usertoken';

class SignInContainer extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmPasswordVisible: false,
      error: null,
    };
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleError(error) {
    this.mounted && this.setState({ error });
  }

  validInput(overrideConfirm) {
    const { email, password, confirmPassword, confirmPasswordVisible } = this.state;
    let valid = true;

    if (email.length === 0 || password.length === 0) {
      this.handleError('Email and password cannot be empty.');
      valid = false;
    }

    if (!overrideConfirm && confirmPasswordVisible && password !== confirmPassword) {
      this.handleError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      this.handleError(null);
    }

    return valid;
  }

  handleSignIn() {
    if (this.validInput(true)) {
      const { email, password } = this.state;
      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          this.handleError(err.reason);
        }
      });
    }
  }

  handleCreateAccount() {
    const { email, password, confirmPasswordVisible } = this.state;

    if (confirmPasswordVisible && this.validInput()) {
      Accounts.createUser({ email, password }, (err) => {
        if (err) {
          this.handleError(err.reason);
        } else {
          // hack because react-native-meteor doesn't login right away after sign in
          this.handleSignIn();
        }
      });
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({ confirmPasswordVisible: true });
    }
  }

  loginWithTokens() {
    const Data = Meteor.getData();
    AccessToken.getCurrentAccessToken()
        .then((res) => {
          if (res) {
            Meteor.call('login', { facebook: res }, (err, result) => {
              if(!err) {//save user id and token
                AsyncStorage.setItem(USER_TOKEN_KEY, result.token);
                Data._tokenIdSaved = result.token;
                Meteor._userIdSaved = result.id;
              }
            });
          }
        });
  }

  signInFacebook (error, result) {
    if (error) {
      console.log('login error', error);
    } else if (result.isCancelled) {
      console.log('login cancelled');
    } else {
      this.loginWithTokens();
    }
  };

  signOutFacebook (){
    Meteor.logout();
  }

  render() {
    return (
        <SignIn
            updateState={this.setState.bind(this)}
            signIn={this.handleSignIn.bind(this)}
            createAccount={this.handleCreateAccount.bind(this)}
            signInFacebook={this.signInFacebook.bind(this)}
            signOutFacebook={this.signOutFacebook.bind(this)}
            {...this.state}
        />
    );
  }
}

export default SignInContainer;
