import  ddpClient from './ddp';
import React, { Component } from 'react';
import { Text, Platform } from 'react-native';
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
import appFacebookGetFriends from './actions/appFacebookGetFriends';
import appCurrentPosition from './actions/appCurrentPosition';
import loggedInSuccess from './actions/loggedInSuccess';
import eventGetList from './actions/eventGetList';
import positionAdd from './actions/positionAdd';
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

//var BackgroundGeolocation = Platform.select({
//    ios: () => require('react-native-background-geolocation'),
//    android: () => require('react-native-background-geolocation-android'),
//})();

var BackgroundGeolocation = require('react-native-background-geolocation-android');

BackgroundGeolocation.configure(geoLoationConfig());

export default class Vardygr extends Component {
    constructor(props) {
        super(props);
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
                        store.dispatch(eventGetList());
                        store.dispatch(appFacebookGetFriends());
                        this.startGeoTracking();
                    }
                });
            }
        });
    }

    startGeoTracking()
    {
        BackgroundGeolocation.start(function() {
            console.log('BackgroundGeolocation started successfully');
            BackgroundGeolocation.changePace(true);

            // Fetch current position
            BackgroundGeolocation.getCurrentPosition({timeout: 30}, function(location) {
                store.dispatch(appCurrentPosition(location.coords.longitude, location.coords.latitude));
                console.log('BackgroundGeolocation received current position: ', JSON.stringify(location));
            }, function(error) {
                console.log('Location error: ' + error);
            });
        });

        // This handler fires whenever bgGeo receives a location update.
        BackgroundGeolocation.on('location', function(location) {
            store.dispatch(positionAdd(location.coords.longitude, location.coords.latitude))
        });
    }

    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key="root" hideNavBar={true} hideTabBar={true}>
                        <Scene key="signIn" component={SignInContainer} title="Sign" initial={true} />
                        <Scene key="main" tabs={true} hideNavBar={true} >
                            <Scene key="home" component={HomeContainer} title="Home" hideNavBar={false} hideTabBar={false} icon={TabIcon}/>
                            <Scene key="event"  title="Create Event" icon={TabIcon} >
                                <Scene key="eventEdit" component={EventEdit} title="Create Event"/>
                                <Scene key="eventEditSelectCoHosts" component={EventEditSelectCoHosts} title="Select Co-Hosts" hideTabBar={true}/>
                                <Scene key="eventEditSelectDateTime" component={EventEditSelectDateTime} title="Select Date / Time" hideTabBar={true}/>
                                <Scene key="eventEditSelectLocation" component={EventEditSelectLocation} title="Select Location" hideTabBar={true}/>
                                <Scene key="eventEditSelectParticipants" component={EventEditSelectParticipants} title="Select Participants" hideTabBar={true}/>
                            </Scene>
                        </Scene>
                        <Scene key="eventOverview" component={EventOverview} title="Event Overview" hideNavBar={false} hideTabBar={false} icon={TabIcon}/>
                        <Scene key="eventTracking" component={EventTracking} title="Event Tracking" hideNavBar={false} hideTabBar={true} icon={TabIcon}/>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        )
    }
}