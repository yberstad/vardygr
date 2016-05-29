import { APP_CURRENT_POSITION } from '../constants/actions';

export default (longitude, latitude) => {
    return {
        type: APP_CURRENT_POSITION,
        longitude,
        latitude
    }
}