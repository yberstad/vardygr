import { POSITION_ADD_SUCCESS } from '../constants/actions';

export default (id) => {
    return {
        type: POSITION_ADD_SUCCESS,
        id
    };
}