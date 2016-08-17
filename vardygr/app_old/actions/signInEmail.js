import { SIGNIN_EMAIL } from '../constants/actions';

export default(email, password) => ({
    type: SIGNIN_EMAIL,
    email,
    password
});