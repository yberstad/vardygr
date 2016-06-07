import {
    EVENT_GET_LIST_SUCCESS,
    EVENT_GET_LIST_AFTER_SAVE_SUCCESS } from '../constants/actions';
import { Actions } from 'react-native-router-flux';
var initialState = {
    eventList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case EVENT_GET_LIST_SUCCESS:
            return Object.assign({}, state, { eventList: action.eventList } );
        case EVENT_GET_LIST_AFTER_SAVE_SUCCESS:
            setTimeout(() => Actions.eventOverview({type:'reset'}), 0);
            return Object.assign({}, state, { eventList: action.eventList } );
        default:
            return state;
    }
}