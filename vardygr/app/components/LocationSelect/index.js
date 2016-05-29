import React, { Component } from 'react';
import {
    View,
    TextBox } from 'react-native';
import Button from '../Button';
import { Actions } from 'react-native-router-flux';

export default class LocationSelect extends Component
{
    validInput() {
        return true;
    }

    handleOk() {
        if (this.validInput()) {
            this.props.selectLocation(64.0, 10.0);
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
                    Select location
                </Text>

                <View style={styles.buttons}>
                    {ok}
                </View>
            </View>
        );
    }
}