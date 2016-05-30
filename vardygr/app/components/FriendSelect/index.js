import React, { Component } from 'react';
import {
    View,
    TextBox,
    Text } from 'react-native';
import Button from '../Button';
import styles from './styles';
import { Actions } from 'react-native-router-flux';

export default class FriendSelect extends Component
{
    validInput() {
        return true;
    }

    handleOk() {
        if (this.validInput()) {
            let friends = [];
            friends.push('xfiEpo6eFJFxsaK6G');
            this.props.selectFriends(friends);
            Actions.pop();
        }
    }
    render(){
        let ok;

        if (this.props.connected) {
            ok = <Button text="OK" onPress={() => this.handleOk()}/>;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.main}>
                    Select friends
                </Text>

                <View style={styles.buttons}>
                    {ok}
                </View>
            </View>
        );
    }
}