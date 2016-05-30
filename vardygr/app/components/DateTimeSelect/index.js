import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    DatePickerIOS } from 'react-native';
import Button from '../Button';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
var CalendarPicker = require('react-native-calendar-picker');

export default class DateTimeSelect extends Component
{
    constructor(props){
        super(props);
        let dateTime = props.dateTime;
        if(!dateTime)
        {
            dateTime = new Date();
        }
        this.state = {
            date: dateTime,
            timeZoneOffsetInHours: (-1) * (dateTime).getTimezoneOffset() / 60
        }
    }

    validInput() {
        return true;
    }

    onDateChange(date) {
        this.setState({ date: date });
    }

    handleOk() {
        if (this.validInput()) {
            this.props.selectedDateTime(this.state.date);
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
                    <DatePickerIOS
                        date={this.state.date}
                        mode="datetime"
                        timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                        onDateChange={(date) => this.onDateChange(date)}
                        minuteInterval={10}
                    />
                
                <View style={styles.buttons}>
                    {ok}
                </View>
            </View>
        );
    }
}