import { EVENT_SAVE_FAILURE } from '../constants/actions';

export default (error) => {
    return {
        type: EVENT_SAVE_FAILURE,
        error
    };
}