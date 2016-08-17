import ddpClient from './ddp';
import React, { Component } from 'react';
import { Text, Platform, BackAndroid, StyleSheet } from 'react-native';
import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux';
import LaunchContainer from './containers/Launch';
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
import loggedInSuccess from './actions/loggedInSuccess';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { connect } from 'react-redux';
import SplashScreen from 'rn-splash-screen';

//import TabIcon from './components/TabIcon';

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? "red" :"black"}}>{this.props.title}</Text>
        );
    }
}
const RouterWithRedux = connect()(Router);
export const store = configureStore();

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#eee',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
});

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
                        ddpClient.callPromise('getUser').then((user) => {
                            store.dispatch(loggedInSuccess(user));
                        }).catch((error)=>{
                            console.log(error);
                        })
                    }
                    else{
                        Actions.signIn({type: 'reset'});
                    }
                });
            }
        });
        SplashScreen.hide();
    }
    

    render() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            try {
                Actions.pop();
                return true;
            }
            catch (err) {
                ToastAndroid.show("Cannot pop. Exiting the app...", ToastAndroid.SHORT);
                return true;
            }
        });
        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key="root" hideNavBar={true} hideTabBar={true}>
                        <Scene key="signIn" component={SignInContainer} title="Sign" />
                        <Scene key="main" tabs={true} hideNavBar={true} tabBarStyle={styles.tabBarStyle} initial={true}>
                            <Scene key="home" component={HomeContainer} title="Home" hideNavBar={false} hideTabBar={false} icon={TabIcon}/>
                            <Scene key="event"  title="Create Event" icon={TabIcon} >
                                <Scene key="eventEdit" component={EventEdit} title="Create Event"/>
                                <Scene key="eventEditSelectCoHosts" component={EventEditSelectCoHosts} title="Select Co-Hosts" hideTabBar={true}/>
                                <Scene key="eventEditSelectDateTime" component={EventEditSelectDateTime} title="Select Date / Time" hideTabBar={true} />
                                <Scene key="eventEditSelectLocation" component={EventEditSelectLocation} title="Select Location" hideTabBar={true} />
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
//                        <Scene key="launch" component={LaunchContainer} title="Launch" initial={true} style={{flex:1, backgroundColor:'transparent'}}/>
