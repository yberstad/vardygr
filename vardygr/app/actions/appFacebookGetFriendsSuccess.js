import { APP_FACEBOOK_GET_FRIENDS_SUCCESS } from '../constants/actions';

export default (result) => {
    return {
        type: APP_FACEBOOK_GET_FRIENDS_SUCCESS,
        result
    }
}