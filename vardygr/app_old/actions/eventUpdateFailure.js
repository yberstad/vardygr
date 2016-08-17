import { EVENT_UPDATE_FAILURE } from '../constants/actions';

export default (error) => {
    return {
        type: EVENT_UPDATE_FAILURE,
        error
    };
}