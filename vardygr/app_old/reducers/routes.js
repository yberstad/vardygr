import { FOCUS } from '../constants/actions';
const initialState = {
    scene: {},
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        // focus action is dispatched when a new screen comes into focus
        case FOCUS:
            return {
                ...state,
                scene: action.scene,
            };

        // ...other actions

        default:
            return state;
    }
}