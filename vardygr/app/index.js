import  ddpClient from './ddp';
import React from 'react';
import { Component } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import SignInContainer from './containers/SignIn';
import HomeContainer from './containers/Home'
import connectedToBackend from './actions/connectedToBackend';
import loggedInSuccess from './actions/loggedInSuccess';


import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

export default class Vardygr extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        ddpClient.connect((error, wasReconnect) => {
            if (error) {
                console.log('connect error', error);
                store.dispatch(connectedToBackend(false, error));
            } else {
                store.dispatch(connectedToBackend(true));
                ddpClient.loginWithToken((err, res) => {
                    if (!err) {
                        store.dispatch(loggedInSuccess());
                    }
                });
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Scene key="root" hideNavBar={true}>
                        <Scene key="signIn" component={SignInContainer} title="Sign" initial={true} />
                        <Scene key="home" component={HomeContainer} title="PageTwo" />
                    </Scene>
                </Router>
            </Provider>
        )
    }
}
