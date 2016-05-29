import {
    EVENT_SAVE,
    EVENT_CREATE_SELECT_LOCATION,
    EVENT_CREATE_SELECT_PARTICIPANTS,
    EVENT_CREATE_SELECT_DATE_TIME,
    EVENT_CREATE_SELECT_CO_HOSTS } from '../constants/actions';
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
        case EVENT_SAVE:
            return Object.assign({}, state, {
                title: action.title,
                description: action.description
            });

        case EVENT_CREATE_SELECT_LOCATION:
            let selectedLocation = {
                type: "Point",
                coordinates: [action.longitude, action.latitude]
            };
            return Object.assign({}, state, {
                location: selectedLocation
            });
        default:
            return state;
    }
}