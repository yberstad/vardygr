import { EVENT_GET_LIST_FAILURE } from '../constants/actions';

export default (error) => {
    return {
        type: EVENT_GET_LIST_FAILURE,
        error
    }
}