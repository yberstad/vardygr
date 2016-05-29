import  ddpClient from './ddp';
import React, { Component } from 'react';
import { Text } from 'react-native';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux';
import SignInContainer from './containers/SignIn';
import HomeContainer from './containers/Home'
import EventCreate from './containers/EventCreate'
import EventDetails from './containers/EventDetails';
import EventCreateSelectCoHosts from './containers/EventCreateSelectCoHosts';
import EventCreateSelectDateTime from './containers/EventCreateSelectDateTime';
import EventCreateSelectLocation from './containers/EventCreateSelectLocation';
import EventCreateSelectParticipants from './containers/EventCreateSelectParticipants';
import EventTracking from './containers/EventTracking'
import appConnected from './actions/appConnected';
import appCurrentPosition from './actions/appCurrentPosition';
import loggedInSuccess from './actions/loggedInSuccess';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {geoLoationConfig} from './config';
import { connect } from 'react-redux';
import TabIcon from './components/TabIcon';

const RouterWithRedux = connect()(Router);
const store = configureStore();
var BackgroundGeolocation = require('react-native-background-geolocation');

BackgroundGeolocation.configure(geoLoationConfig());

export default class Vardygr extends Component {
    constructor(props) {
        super(props);

        BackgroundGeolocation.start(function() {
            console.log('BackgroundGeolocation started successfully');

            // Fetch current position
            BackgroundGeolocation.getCurrentPosition({timeout: 30}, function(location) {
                store.dispatch(appCurrentPosition(location.coords.longitude, location.coords.latitude));
                console.log('BackgroundGeolocation received current position: ', JSON.stringify(location));
            }, function(error) {
                console.log('Location error: ' + error);
            });
        });
    }

    componentWillMount() {
        ddpClient.connect((error, wasReconnect) => {
            if (error) {
                console.log('connect error', error);
                store.dispatch(appConnected(false, error));
            } else {
                store.dispatch(appConnected(true));
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
                <RouterWithRedux>
                    <Scene key="root" hideNavBar={true} hideTabBar={true}>
                        <Scene key="signIn" component={SignInContainer} title="Sign" initial={true} />
                        <Scene key="main" tabs={true} hideNavBar={true} >
                            <Scene key="home" component={HomeContainer} title="Home" hideNavBar={true} hideTabBar={false} icon={TabIcon}/>
                            <Scene key="event"  title="Create Event" icon={TabIcon} >
                                <Scene key="eventCreate" component={EventCreate} title="Create Event"/>
                                <Scene key="eventCreateSelectCoHosts" component={EventCreateSelectCoHosts} title="Select Co-Hosts" />
                                <Scene key="eventCreateSelectDateTime" component={EventCreateSelectDateTime} title="Select Date / Time" />
                                <Scene key="eventCreateSelectLocation" component={EventCreateSelectLocation} title="Select Location" />
                                <Scene key="eventCreateSelectParticipants" component={EventCreateSelectParticipants} title="Select Participants" />
                            </Scene>
                        </Scene>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        )
    }
}