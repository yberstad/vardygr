import { POSITION_ADD } from '../constants/actions';

const initialState = {
    eventIds: [],
    location: {
        type: "Point",
            coordinates: []
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case POSITION_ADD:
            let selectedLocation = {
                type: "Point",
                coordinates: [action.longitude, action.latitude]
            };
            return Object.assign({}, state, {
                location: selectedLocation,
                eventIds: action.eventIds
            });
        default:
            return state
    }
}