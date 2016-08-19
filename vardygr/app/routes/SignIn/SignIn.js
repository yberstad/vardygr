import React from 'react';
import { Text, View, Image } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';
import GenericTextInput, { InputWrapper } from '../../components/GenericTextInput';
import images from '../../config/images';
import styles from './styles';
import FBSDK, { LoginButton } from 'react-native-fbsdk';

const SignIn = (props) => {
    const { updateState, signIn, createAccount, error, confirmPasswordVisible, signInFacebook, signOutFacebook } = props;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={images.logo}
                />

                <Text style={styles.headerText}>React Native Meteor</Text>
                <Text style={styles.subHeaderText}>Boilerplate</Text>
            </View>

            <InputWrapper>
                <GenericTextInput
                    placeholder="email address"
                    onChangeText={(email) => updateState({ email })}
                />
                <GenericTextInput
                    placeholder="password"
                    onChangeText={(password) => updateState({ password })}
                    secureTextEntry
                    borderTop
                />
                {confirmPasswordVisible ?
                    <GenericTextInput
                        placeholder="confirm password"
                        onChangeText={(confirmPassword) => updateState({ confirmPassword })}
                        secureTextEntry
                        borderTop
                    />
                    : null}
            </InputWrapper>

            <View style={styles.error}>
                <Text style={styles.errorText}>{error}</Text>
            </View>

            <View style={styles.buttons}>
                <Button text="Sign In" onPress={signIn} />
                <Button text="Create Account" onPress={createAccount} />
            </View>

            <LoginButton
                readPermissions={['public_profile', 'email', 'user_friends']}
                onLoginFinished={signInFacebook}
                onLogoutFinished={signOutFacebook} />


            <KeyboardSpacer />
        </View>
    );
};

SignIn.propTypes = {
    updateState: React.PropTypes.func,
    signIn: React.PropTypes.func,
    createAccount: React.PropTypes.func,
    signInFacebook: React.PropTypes.func,
    signOutFacebook: React.PropTypes.func,
    error: React.PropTypes.string,
    confirmPasswordVisible: React.PropTypes.bool,
};

export default SignIn;
