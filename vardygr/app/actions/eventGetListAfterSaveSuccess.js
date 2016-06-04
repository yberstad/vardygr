import { EVENT_GET_LIST_AFTER_SAVE_SUCCESS } from '../constants/actions';

export default (eventList) => {
    return {
        type: EVENT_GET_LIST_AFTER_SAVE_SUCCESS,
        eventList
    }
}
