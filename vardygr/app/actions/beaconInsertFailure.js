import { BEACON_INSERT_FAILURE } from '../constants/actions';

export default (error) => {
    return {
        type: BEACON_INSERT_FAILURE,
        error
    };
}