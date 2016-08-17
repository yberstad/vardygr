import { SIGNUP_EMAIL_FAILURE } from '../constants/actions';

export default (error) => {
    return {
        type: SIGNUP_EMAIL_FAILURE,
        error
    }
}