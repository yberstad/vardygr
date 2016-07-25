import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';
import styles from './styles';


export default class Launch extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.main}>
                    Launch
                </Text>
            </View>
        );
    }
}
