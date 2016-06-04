import { EVENT_UPDATE_SUCCESS } from '../constants/actions';

export default (event) => {
    return {
        type: EVENT_UPDATE_SUCCESS,
        event
    };
}