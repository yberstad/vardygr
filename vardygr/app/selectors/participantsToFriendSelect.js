import { createSelector } from 'reselect';

export default createSelector(
    [(state) => state.get('currentEvent').participants],
    (participants) => {
        let participantList = [];
        participants.map((participant) => {
            participantList.push(participant.userId);
        });
        return participantList;
    }
);
