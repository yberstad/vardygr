import React from 'react';
import {
    Component,
    ListView,
    Text,
    TouchableOpacity,
    View,
    TextInput } from 'react-native';
import Button from '../Button';
import styles from './styles';

export default class EventDetails extends Component {

    state = {
        title: '',
        description: '',
        canInviteFriends: false,
        displayPositionOfCreator: true,
        displayPositionForAllParticipants: true
    } = this.props.event;

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
        }
    }

    render() {
        let save;

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

                <Text style={styles.error}>{this.state.error}</Text>

                <View style={styles.buttons}>
                    {save}
                </View>
            </View>
        );
    }
}
