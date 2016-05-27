import { EVENT_SAVE } from '../constants/actions'

var initialState  = {
    id: '',
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
    switch (action.type){
        case EVENT_SAVE:
            return Object.assign({}, state, {event: action.event});
        default:
            return state;
    }
}