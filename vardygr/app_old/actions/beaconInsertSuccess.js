import { BEACON_INSERT_SUCCESS } from '../constants/actions';

export default (id) => {
    return {
        type: BEACON_INSERT_SUCCESS,
        id
    };
}