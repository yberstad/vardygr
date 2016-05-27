import { SIGNUP_EMAIL } from '../constants/actions';

export default (email, password) => {
    return {
        type: SIGNUP_EMAIL,
        email,
        password
    }
}