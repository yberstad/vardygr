import { SIGNOUT_FACEBOOK_FAILURE } from '../constants/actions';

export default (error) => {
    return {
        type: SIGNOUT_FACEBOOK_FAILURE,
        error
    }
};