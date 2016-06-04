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
            Actions.main();
        }
    }
    
    handleDatePressed(){
        Actions.eventEditSelectDateTime();
    }

    handleLocationPressed(){
        Actions.eventEditSelectLocation();
    }

    handleParticipantsPressed(){
        Actions.eventEditSelectParticipants();
    }

    render() {
        const { startDateTime } = this.props.event;
        let save;
        let dateTimeFormat = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        let dateTimeText = startDateTime ? startDateTime.toLocaleDateString('nb-NO', dateTimeFormat) : '';
        if (this.props.connected) {
            save = <Button text="Save" onPress={() => this.handleSave()}/>;
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
                <TextInput
                    style={styles.input}
                    placeholder="Select date / time"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value = {dateTimeText}
                    onFocus = {() => this.handleDatePressed()}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Select position"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => this.handleLocationPressed()}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Select participants"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => this.handleParticipantsPressed()}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Select coHosts"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => Actions.eventEditSelectCoHosts()}
                />


                <Text style={styles.error}>{this.state.error}</Text>

                <View style={styles.buttons}>
                    {save}
                </View>
            </View>
        );
    }
}
