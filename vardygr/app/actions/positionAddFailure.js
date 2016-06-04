import { POSITION_ADD_FAILURE } from '../constants/actions';

export default (error) => {
    return {
        type: POSITION_ADD_FAILURE,
        error
    };
}