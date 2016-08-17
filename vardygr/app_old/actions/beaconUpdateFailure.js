import { BEACON_UPDATE_FAILURE } from '../constants/actions';

export default (error) => {
    return {
        type: BEACON_UPDATE_FAILURE,
        error
    };
}