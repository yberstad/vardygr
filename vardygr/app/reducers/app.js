import { 
    APP_CONNECTED,
    APP_CURRENT_POSITION} from '../constants/actions';

const initialState = {
    longitude: 0,
    latitude: 0,
    connected: false,
    error: null
}
export default (state = initialState, action) => {
    switch (action.type){
        case APP_CONNECTED:
            return Object.assign({}, state, { connected: action.connected, error: action.error });
        case APP_CURRENT_POSITION:
            return Object.assign({}, state, { longitude: action.longitude, latitude: action.latitude });
        default:
            return state;
    }
};