import { EVENT_SAVE_SUCCESS } from '../constants/actions';

export default (id) => {
    return {
        type: EVENT_SAVE_SUCCESS,
        id
    };
}