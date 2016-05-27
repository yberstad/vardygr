import { EVENT_SAVE } from '../constants/actions';

export default (event) => {
    return {
        type: EVENT_SAVE,
        event
    };
}