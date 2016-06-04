import { createSelector } from 'reselect';

export default createSelector([
        (state) => state.get('position'),
        (state) => state.get('eventList').eventList]
    ,
    (position, eventList) => {
        let eventIdList =  [];
        eventList.map((event) => {
            eventIdList.push(event._id);
        })
        return Object.assign({}, position, {eventIds: eventIdList[0]});
    }
);