import { EVENT_SAVE } from '../constants/actions';

export default (title, description) => {
    return {
        type: EVENT_SAVE,
        title,
        description
    };
}