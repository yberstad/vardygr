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

const FBSDK = require('react-native-fbsdk');
const {
    AppInviteDialog,
    AppInviteContent
} = FBSDK;

export default class EventDetails extends Component {

    state = {
        title: '',
        description: '',
        canInviteFriends: false,
        displayPositionOfCreator: true,
        displayPositionForAllParticipants: true,
        canShowInvite: false
    }

    componentWillMount(){
        AppInviteDialog.canShow().then(
            () => {
                this.setState({ canShowInvite: true });
            },
            () => {
                this.setState({ canShowInvite: false });

            })
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


    handleInvite(){

        AppInviteDialog.show({applinkUrl: 'https://fb.me/1737187526552555'})
            .then((data)=> {
                console.log(data);
            },
            (data, error) =>{
                console.log(data);
                console.log(error);
            });
    }


    render() {
        const { startDateTime } = this.props.event;
        let save;
        let invite;
        let dateTimeFormat = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        let dateTimeText = startDateTime ? startDateTime.toLocaleDateString('nb-NO', dateTimeFormat) : '';
        if (this.props.connected) {
            save = <Button text="Save" onPress={() => this.handleSave()}/>;
        }

        if (this.state.canShowInvite) {
            invite = <Button text="App Invite" onPress={() => this.handleInvite()}/>;
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
                <Button
                    text="Select date / time"
                    onPress = {() => Actions.eventEditSelectDateTime()}
                />
                <Button
                    text="Select position"
                    onPress={() => Actions.eventEditSelectLocation()}
                />
                <Button
                    text="Select participants"
                    onPress={() => Actions.eventEditSelectParticipants()}
                />
                <Button
                    text="Select coHosts"
                    onPress={() => Actions.eventEditSelectCoHosts()}
                />


                <Text style={styles.error}>{this.state.error}</Text>

                {save}
                {invite}
            </View>
        );
    }
}
