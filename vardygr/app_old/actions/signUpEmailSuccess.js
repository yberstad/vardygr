import { SIGNUP_EMAIL_SUCCESS } from '../constants/actions';

export default (user) => {
    return {
        type: SIGNUP_EMAIL_SUCCESS,
        user
    }
}