import React from 'react';
import { 
    Component, 
    View, 
    TextBox } from 'react-native';

export default class LocationSelect extends Component
{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.main}>
                    Select location
                </Text>
            </View>
        );
    }
}