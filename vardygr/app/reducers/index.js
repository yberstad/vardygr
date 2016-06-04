import { combineReducers } from 'redux-immutablejs';
import app from './app';
import routes from './routes'
import currentUser from './currentUser';
import currentEvent from './currentEvent';
import eventList from './eventList';
import position from './position';


export default combineReducers({
    app,
    routes,
    currentUser,
    currentEvent,
    eventList,
    position
});