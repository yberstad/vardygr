import React, { Component } from 'react';
import {
    View,
    TextBox } from 'react-native';
import Button from '../Button';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

export default class EventOverview extends Component
{
    validInput() {
        return true;
    }

    handleOk() {
        if (this.validInput()) {
            this.props.selectedDateTime( new Date().addHours(1));
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
                    Event overview
                </Text>

                <View style={styles.buttons}>
                    {ok}
                </View>
            </View>
        );
    }
}