import { CONNECTED_TO_BACKEND,
         SIGNIN_EMAIL_SUCCESS,
         LOGGED_IN_SUCCESS} from '../constants/actions';
import { Actions } from 'react-native-router-flux';

const initialState = {
    connected: false,
    signedIn: false
}
export default (state = initialState, action) => {
  switch (action.type){
      case CONNECTED_TO_BACKEND:
          return Object.assign({}, state, { connected: action.payload.connected, error: action.payload.error });
      case LOGGED_IN_SUCCESS:
      case SIGNIN_EMAIL_SUCCESS:
          setTimeout(() => Actions.home(), 0);
          return Object.assign({}, state, { signedIn: true });
      default:
          return state;
  }
};