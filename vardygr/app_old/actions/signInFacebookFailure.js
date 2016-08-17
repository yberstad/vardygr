import { SIGNIN_FACEBOOK_FAILURE } from '../constants/actions';

export default(error) => ({
    type: SIGNIN_FACEBOOK_FAILURE,
    error
});