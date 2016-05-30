import {
    EVENT_SAVE,
    EVENT_SAVE_SUCCESS,
    EVENT_CREATE_SELECT_LOCATION,
    EVENT_CREATE_SELECT_PARTICIPANTS,
    EVENT_CREATE_SELECT_DATE_TIME,
    EVENT_CREATE_SELECT_CO_HOSTS } from '../constants/actions';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

var initialState  = {
    id: '',
    title: '',
    description: '',
    location: {
        type: "Point",
        coordinates: []
    },
    participants: [{
        userId: '',
        acknowledged: false,
        accepted: false,
        isCoHost: false
    }],
    canInviteFriends: false,
    startDateTime: null,
    displayPositionOfCreator: true,
    displayPositionForAllParticipants: true,
    region: {
        longitudeDelta: 0.0,
        latitudeDelta: 0.0
    },
    schedule: '',
    address: ''
};

export default (state = initialState, action) => {
    let participants = [];
    switch (action.type) {
        case EVENT_SAVE:
            return Object.assign({}, state, {
                title: action.title,
                description: action.description
            });
        case EVENT_SAVE_SUCCESS:
            setTimeout(() => Actions.home(),0);
            return Object.assign({}, state, {id: action.id});
        case EVENT_CREATE_SELECT_LOCATION:
            let selectedLocation = {
                type: "Point",
                coordinates: [action.longitude, action.latitude]
            };
            return Object.assign({}, state, {
                location: selectedLocation
            });
        case EVENT_CREATE_SELECT_DATE_TIME:
            return Object.assign({}, state, {
                startDateTime: action.startDateTime
            });
        case EVENT_CREATE_SELECT_PARTICIPANTS:
            action.participantList.map((id) => {
                participants.push({
                    userId: id,
                    acknowledged: false,
                    accepted: false,
                    isCoHost: false
                });
            });
            return Object.assign({}, state, {
                participants: participants
            });
        case EVENT_CREATE_SELECT_CO_HOSTS:
            action.coHostList.map((id) => {
                let participant = _.find(state.participants, (p) => {return p.userId === id});
                let newParticipant;
                if(participant){
                    newParticipant = Object.assign({}, participant, { isCoHost: true} );
                }
                else{
                    newParticipant = {
                        userId: id,
                        acknowledged: false,
                        accepted: false,
                        isCoHost: true
                    };
                }
                participants.push(newParticipant);
            });
            return Object.assign({}, state, {
                participants: participants
            });
        default:
            return state;
    }
}