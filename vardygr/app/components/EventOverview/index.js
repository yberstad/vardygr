import React, { Component } from 'react';
import {
    View,
    TextBox,
    Text } from 'react-native';
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
            if(this.props.type == 'reset')
            {
                Actions.main();
            }
            else {
                Actions.pop();
            }
        }
    }

    handleMap() {
        if (this.validInput()) {
            Actions.eventTracking();
        }
    }

    render(){
        const { currentEvent, appState } = this.props;
        let ok;

        if (appState.connected) {
            ok = <Button text="Back" onPress={() => this.handleOk()}/>;
            map = <Button text="Map" onPress={() => this.handleMap()}/>;
        }
        return (
            <View style={styles.container}>
                <Text style={styles.main}>
                    Event overview
                    (id: {currentEvent._id})
                </Text>

                <View style={styles.buttons}>
                    {ok}
                    {map}
                </View>
            </View>
        );
    }
}