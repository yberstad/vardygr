import { APP_CONNECTED } from '../constants/actions';

export default(connected, error) => ({
    type: APP_CONNECTED,
    connected,
    error
});