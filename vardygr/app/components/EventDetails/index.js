import React, { Component } from 'react';
import {
    ListView,
    Text,
    TouchableOpacity,
    View,
    TextInput } from 'react-native';
import Button from '../Button';
import styles from './styles';
import { Actions } from 'react-native-router-flux';

export default class EventDetails extends Component {

    state = {
        title: '',
        description: '',
        canInviteFriends: false,
        displayPositionOfCreator: true,
        displayPositionForAllParticipants: true
    }

    validInput() {
        let { title, description } = this.state;
        let valid = false;
        if (title.length && description.length) {
            this.setState({error: null});
            valid = true;
        } else {
            this.setState({error: 'Title and description cannot be empty.'});
        }
    
        return valid;
    }

    handleSave() {
        if (this.validInput()) {
            this.props.eventSave(this.state.title, this.state.description);
            Actions.pop();
        }
    }

    handleDatePressed(){
        ;
    }



    render() {
        let save;

        if (this.props.connected) {
            save = <Button text="Save" onPress={Actions.eventCreateSelectDateTime}/>;
        }

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Event title"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value = {this.state.title}
                    onChangeText={(title) => this.setState({title})}
                />
                <TextInput
                    style={styles.input}
                    placeholder="More info"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value = {this.state.description}
                    onChangeText={(description) => this.setState({description})}
                />
                <TouchableOpacity onPress={Actions.eventCreateSelectDateTime}>
                    <TextInput
                        style={styles.input}
                        placeholder="More info"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value = {this.state.description}
                        editable = {false}
                    />
                </TouchableOpacity>

                <Text style={styles.error}>{this.state.error}</Text>

                <View style={styles.buttons}>
                    {save}
                </View>
            </View>
        );
    }
}
