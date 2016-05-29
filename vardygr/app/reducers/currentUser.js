import {
    LOGGED_IN_SUCCESS,
    SIGNUP_EMAIL_SUCCESS } from '../constants/actions';
import { Actions } from 'react-native-router-flux';

const initialState = {
    signedIn: false,
    user: null
}
export default (state = initialState, action) => {
    switch (action.type){
        case SIGNUP_EMAIL_SUCCESS:
        case LOGGED_IN_SUCCESS:
            setTimeout(() => Actions.main(), 0);
            return Object.assign({}, state, { signedIn: true, user: action.user });
        
        default:
            return state;
    }
};