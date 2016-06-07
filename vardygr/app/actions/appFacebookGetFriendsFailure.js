import { APP_FACEBOOK_GET_FRIENDS_FAILURE } from '../constants/actions';

export default (error) => {
    return {
        type: APP_FACEBOOK_GET_FRIENDS_FAILURE,
        error
    }
}