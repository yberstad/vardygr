import { EVENT_SAVE_SUCCESS } from '../constants/actions';

export default (event) => {
    return {
        type: EVENT_SAVE_SUCCESS,
        event
    };
}