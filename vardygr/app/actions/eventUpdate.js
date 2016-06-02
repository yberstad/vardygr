import { EVENT_UPDATE } from '../constants/actions';

export default (event) => {
    return {
        type: EVENT_UPDATE,
        event
    };
}