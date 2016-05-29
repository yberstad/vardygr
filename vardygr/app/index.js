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
import connectedToBackend from './actions/connectedToBackend';
import loggedInSuccess from './actions/loggedInSuccess';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { connect } from 'react-redux';
// import TabIcon from './components/TabIcon';

const RouterWithRedux = connect()(Router);
const store = configureStore();

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? "red" :"black"}}>{this.props.title}</Text>
        );
    }
}

const getSceneStyle = function (props) {
    return {
        flex: 1,
        marginTop: props.hideNavBar ? 0 : 64,
        marginBottom: props.hideTabBar ? 0 : 49.5,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
}

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
                    <Scene key="root">
                        <Scene key="main" tabs={true} >
                            <Scene key="home" component={HomeContainer} title="Home" hideNavBar={true} hideTabBar={false} icon={TabIcon}/>
                            <Scene key="eventTracking" component={EventTracking} title="Event Tracking" icon={TabIcon} />
                            <Scene key="event"  title="Create Event" icon={TabIcon} >
                                <Scene key="eventCreate" component={EventCreate} title="Create Event" />
                                <Scene key="eventCreateSelectCoHosts" component={EventCreateSelectCoHosts} title="Select Co-Hosts" />
                                <Scene key="eventCreateSelectDateTime" component={EventCreateSelectDateTime} title="Select Date / Time" />
                                <Scene key="eventCreateSelectLocation" component={EventCreateSelectLocation} title="Select Location" />
                                <Scene key="eventCreateSelectParticipants" component={EventCreateSelectParticipants} title="Select Location" />
                            </Scene>
                        </Scene>
                    </Scene>
                </Router>
            </Provider>
        )
    }
}
//
// <Router getSceneStyle={getSceneStyle}>
//     <Scene key="modal" component={Modal} >
//         <Scene key="root" hideNavBar={true} >
//             <Scene key="signIn" component={SignInContainer} title="Sign" initial={true} />
//             <Scene key="home" component={HomeContainer} title="Home" tabs={true} hideTabBar={false} >
//                 <Scene key="eventCreate" component={EventCreate} title="Create Event" icon={TabIcon} >
//                     <Scene key="eventCreateSelectCoHosts" component={EventCreateSelectCoHosts} title="Select Co-Hosts" />
//                     <Scene key="eventCreateSelectDateTime" component={EventCreateSelectDateTime} title="Select Date / Time" />
//                     <Scene key="eventCreateSelectLocation" component={EventCreateSelectLocation} title="Select Location" />
//                     <Scene key="eventCreateSelectParticipants" component={EventCreateSelectParticipants} title="Select Location" />
//                 </Scene>
//                 <Scene key="eventTracking" component={EventTracking} title="Event Tracking" icon={TabIcon} />
//             </Scene>
//             <Scene key="eventDetails" component={EventDetails} title="Event" hideNavBar={false} />
//         </Scene>
//     </Scene>
// </Router>

// <Provider store={store}>
//     <Router>
//         <Scene key="root">
//             <Scene key="main" tabs={true} >
//                 <Scene key="home" component={HomeContainer} title="PageOne" icon={TabIcon} />
//                 <Scene key="eventTracking" component={EventTracking} title="PageTwo" icon={TabIcon} />
//             </Scene>
//         </Scene>
//     </Router>
// </Provider>
