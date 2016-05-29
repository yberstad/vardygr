import React, { Component } from 'react';
import {
    View, 
    TextBox,
    Text } from 'react-native';
import styles from './styles';

export default class EventTracking extends Component
{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.main}>
                    Track current event
                </Text>
            </View>
        );
    }
}