import { EVENT_SET_CURRENT } from '../constants/actions';

export default (id) => {
    return {
        type: EVENT_SET_CURRENT,
        id
    }
}