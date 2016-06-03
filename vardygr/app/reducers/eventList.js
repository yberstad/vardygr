import { EVENT_GET_LIST_SUCCESS } from '../constants/actions';

var initialState = {
    eventList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case EVENT_GET_LIST_SUCCESS:
            return Object.assign({}, state, { eventList: action.eventList } );
        default:
            return state;
    }
}