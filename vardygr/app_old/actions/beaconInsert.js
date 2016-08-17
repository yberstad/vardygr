import { BEACON_INSERT } from '../constants/actions';

export default (title) => {
    return {
        type: BEACON_INSERT,
        title
    };
}
