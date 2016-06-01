import { SIGNOUT_FACEBOOK } from '../constants/actions';

export default (result) => {
    return {
        type: SIGNOUT_FACEBOOK,
        result
    }
};