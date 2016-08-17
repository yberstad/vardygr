import { LOGGED_IN_SUCCESS } from '../constants/actions';

export default(user) => ({
    type: LOGGED_IN_SUCCESS,
    user
});