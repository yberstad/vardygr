import { SIGNIN_FACEBOOK } from '../constants/actions';

export default (result) => {
    return {
        type: SIGNIN_FACEBOOK,
        result
    }
};