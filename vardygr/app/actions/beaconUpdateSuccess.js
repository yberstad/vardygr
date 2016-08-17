import { BEACON_UPDATE_SUCCESS } from '../constants/actions';

export default (id) => {
    return {
        type: BEACON_UPDATE_SUCCESS,
        id
    };
}