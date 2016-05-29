import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity } from 'react-native';

import styles from './styles';

export default class Button extends Component {
    render() {
        let { text, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>
                    {text}
                </Text>
            </TouchableOpacity>
        );
    }
}

Button.defaultProps = {
    text: "Button Text",
    onPress: () => console.log('Button Pressed')
};