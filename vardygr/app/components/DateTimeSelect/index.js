import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity } from 'react-native';
import Button from '../Button';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

export default class DateTimeSelect extends Component
{
    constructor(props){
        super(props);
        Date.prototype.addHours= function(h){
            var copiedDate = new Date(this.getTime());
            copiedDate.setHours(copiedDate.getHours()+h);
            return copiedDate;
        }
    }

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
                    Select date / time
                </Text>

                <View style={styles.buttons}>
                    {ok}
                </View>
            </View>
        );
    }
}