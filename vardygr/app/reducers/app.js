import { CONNECTED_TO_BACKEND } from '../constants/actions';

const initialState = {
    connected: false,
    error: null
}
export default (state = initialState, action) => {
    switch (action.type){
        case CONNECTED_TO_BACKEND:
            return Object.assign({}, state, { connected: action.connected, error: action.error });
        default:
            return state;
    }
};