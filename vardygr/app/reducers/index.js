import { combineReducers } from 'redux-immutablejs';
import app from './app';
import routes from './routes'
import currentUser from './currentUser';
import currentEvent from './currentEvent';


export default combineReducers({
    app,
    routes,
    currentUser,
    currentEvent,
});