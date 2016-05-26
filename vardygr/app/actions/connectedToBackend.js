import { CONNECTED_TO_BACKEND } from '../constants/actions';

export default(connected, error) => ({
    type: CONNECTED_TO_BACKEND,
    connected,
    error
});