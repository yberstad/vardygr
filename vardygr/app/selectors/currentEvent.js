import { createSelector } from 'reselect';

export default createSelector([
        (state) => state.get('currentEvent'), 
        (state) => state.get('eventList').eventList]
    ,
    (currentEvent, eventList) => {
        return eventList.find((event) => {
            return event._id === currentEvent._id;
        })
    }
);