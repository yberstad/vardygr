import React, { Component } from 'react';
import {
    ListView,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import Button from '../Button';
import styles from './styles';
import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';


export default class SignIn extends Component {

    state = {
        email: '',
        password: '',
        error: null
    };

    validInput() {
        let { email, password } = this.state;
        let valid = false;
        if (email.length && password.length) {
            this.setState({error: null});
            valid = true;
        } else {
            this.setState({error: 'Email and password cannot be empty.'});
        }

        return valid;
    }

    handleSignIn() {
        if (this.validInput()) {
            this.props.signInEmail(this.state.email, this.state.password);
        }
    }

    handleCreateAccount() {
        if (this.validInput()) {
            this.props.signUpEmail(this.state.email, this.state.password);
        }
    }

    onLoginFinished (error, result) {
        if (error) {
            this.props.signInFacebookFailure(result.error);
        } else if (result.isCancelled) {
            this.props.signInFacebookFailure(result);
        } else {
            AccessToken.getCurrentAccessToken()
                .then((res) => {
                    if (res) {
                        this.props.signInFacebook(res);
                    }
                    else {
                        this.props.signInFacebookFailure();
                    }
                });
        }
    }


    render() {
        let signIn, createAccount;

        if (this.props.connected) {
            signIn = <Button text="Sign In" onPress={() => this.handleSignIn()}/>;
            createAccount = <Button text="Create Account" onPress={() => this.handleCreateAccount()}/>;
        }

        return (
            <View style={styles.container}>
                <Text style={styles.main}>
                    Sign In Screen
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value = {this.state.email}
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value = {this.state.password}
                    onChangeText={(password) => this.setState({password})}
                    secureTextEntry={true}
                />

                <Text style={styles.error}>{this.state.error}</Text>

                <View style={styles.buttons}>
                    {signIn}
                    {createAccount}
                </View>

                <LoginButton
                    readPermissions={['public_profile', 'email', 'user_friends']}
                    onLoginFinished={(error, result) => this.onLoginFinished(error, result)}
                    onLogoutFinished={() => this.props.signOutFacebook()}/>
            </View>
        );
    }
}
