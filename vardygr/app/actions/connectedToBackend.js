import { CONNECTED_TO_BACKEND } from '../constants/actions';

export default(connected, error) => ({
    type: CONNECTED_TO_BACKEND,
    payload: {
        connected,
        error
    }
});