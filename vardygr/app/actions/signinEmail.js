import { SIGN_IN_EMAIL } from '../constants/actions';

export default(email, password) => ({
    type: SIGN_IN_EMAIL,
    payload: {
        email,
        password
    }
});