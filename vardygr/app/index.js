import  ddpClient from './ddp';
import React, { Component } from 'react';
import { Text } from 'react-native';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux';
import SignInContainer from './containers/SignIn';
import HomeContainer from './containers/Home'
import EventEdit from './containers/EventEdit'
import EventOverview from './containers/EventOverview';
import EventEditSelectCoHosts from './containers/EventEditSelectCoHosts';
import EventEditSelectDateTime from './containers/EventEditSelectDateTime';
import EventEditSelectLocation from './containers/EventEditSelectLocation';
import EventEditSelectParticipants from './containers/EventEditSelectParticipants';
import EventTracking from './containers/EventTracking'
import appConnected from './actions/appConnected';
import appCurrentPosition from './actions/appCurrentPosition';
import loggedInSuccess from './actions/loggedInSuccess';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import {geoLoationConfig} from './config';
import { connect } from 'react-redux';
//import TabIcon from './components/TabIcon';
class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? "red" :"black"}}>{this.props.title}</Text>
        );
    }
}
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
                        store.dispatch(loggedInSuccess(res));
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
                                <Scene key="eventEdit" component={EventEdit} title="Create Event"/>
                                <Scene key="eventEditSelectCoHosts" component={EventEditSelectCoHosts} title="Select Co-Hosts" />
                                <Scene key="eventEditSelectDateTime" component={EventEditSelectDateTime} title="Select Date / Time" />
                                <Scene key="eventEditSelectLocation" component={EventEditSelectLocation} title="Select Location" />
                                <Scene key="eventEditSelectParticipants" component={EventEditSelectParticipants} title="Select Participants" />
                            </Scene>
                        </Scene>
                        <Scene key="eventOverview" component={EventOverview} title="Event Details" hideNavBar={false} hideTabBar={true} icon={TabIcon}/>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        )
    }
}