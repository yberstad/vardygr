import { BEACON_UPDATE } from '../constants/actions';

export default (longitude, latitude) => {
    return {
        type: BEACON_UPDATE,
        longitude,
        latitude
    };
}
