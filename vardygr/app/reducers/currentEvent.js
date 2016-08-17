import {
    EVENT_SET_CURRENT,
    EVENT_UPDATE,
    EVENT_SAVE,
    EVENT_SAVE_SUCCESS,
    EVENT_EDIT_SELECT_LOCATION,
    EVENT_EDIT_SELECT_PARTICIPANTS,
    EVENT_EDIT_SELECT_DATE_TIME,
    EVENT_EDIT_SELECT_CO_HOSTS } from '../constants/actions';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

var initialState  = {
    _id: null,
    title: '',
    description: '',
    location: {
        type: "Point",
        coordinates: []
    },
    participants: [{
        facebookId: '',
        acknowledged: false,
        accepted: false,
        displayName: ''
    }],
    coHosts: [{
        facebookId: '',
        acknowledged: false,
        accepted: false
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
    switch (action.type) {
        case EVENT_SET_CURRENT:
            return Object.assign({}, state, {
                _id: action.id
            });
        case EVENT_UPDATE:
            return Object.assign({}, state, {
                title: action.title,
                description: action.description
            });
        case EVENT_SAVE:
            return Object.assign({}, state, {
                title: action.title,
                description: action.description
            });
        case EVENT_SAVE_SUCCESS:
            return Object.assign({}, state, {_id: action.id});
        case EVENT_EDIT_SELECT_LOCATION:
            let selectedLocation = {
                type: "Point",
                coordinates: [action.longitude, action.latitude]
            };
            return Object.assign({}, state, {
                location: selectedLocation
            });
        case EVENT_EDIT_SELECT_DATE_TIME:
            return Object.assign({}, state, {
                startDateTime: action.startDateTime
            });
        case EVENT_EDIT_SELECT_PARTICIPANTS:
            let participants = [];
            action.participantList.map((item) => {
                let participant = _.find(state.participants, (p) => {return p.userId === item.id});
                let newParticipant;
                if(participant){
                    newParticipant = Object.assign({}, participant );
                }
                else{
                    newParticipant = {
                        facebookId: item.id,
                        acknowledged: false,
                        accepted: false,
                        displayName: item.name
                    };
                }
                participants.push(newParticipant);
            });
            return Object.assign({}, state, {
                participants: participants
            });
        case EVENT_EDIT_SELECT_CO_HOSTS:
            let coHosts = [];
            action.coHostList.map((id) => {
                let coHost = _.find(state.coHosts, (p) => {return p.userId === id});
                let newCoHost;
                if(coHost){
                    newCoHost = Object.assign({}, coHost );
                }
                else{
                    newCoHost = {
                        userId: id,
                        acknowledged: false,
                        accepted: false
                    };
                }
                coHosts.push(newCoHost);
            });
            return Object.assign({}, state, {
                coHosts: coHosts
            });
        default:
            return state;
    }
}