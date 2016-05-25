import { SIGNIN_EMAIL_FAILURE } from '../constants/actions';

export default(error) => ({
    type: SIGNIN_EMAIL_FAILURE,
    error
});