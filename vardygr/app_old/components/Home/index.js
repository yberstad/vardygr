import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity } from 'react-native';

import styles from './styles';

export default class Home extends Component {
    render(){
        let signedIn = this.props.signedIn ? "jaggu" : "neggu";
         return (
            <View style={styles.container}>
                <Text style={styles.main}>
                    Home {signedIn}
                </Text>
            </View>
        );
    }
}
