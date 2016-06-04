import { POSITION_ADD } from '../constants/actions';

export default (longitude, latitude, eventIds) => {
    return {
        type: POSITION_ADD,
        longitude,
        latitude
    };
}