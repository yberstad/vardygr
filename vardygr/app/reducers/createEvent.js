import { EVENT_CREATE } from '../constants/actions';
import { Action } from 'react-native-router-flux';

var initialState  = {
    title: '',
    description: '',
    location: {
        type: "Point",
        coordinates: []
    },
    participants: [],
    coHosts: [],
    canInviteFriends: false,
    startTime: null,
    displayPositionOfCreator: true,
    displayPositionForAllParticipants: true,
    region: {
        longitudeDelta: 0,
        latitudeDelta: 0
    },
    schedule: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case EVENT_CREATE:
            setTimeout(Action.eventCreate(), 0);
            return state;
        default:
            return state;
    }
}