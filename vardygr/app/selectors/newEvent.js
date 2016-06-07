import { createSelector } from 'reselect';

export default createSelector(
    [
        (state) => state.get('currentEvent'),
        (state) => state.get('currentUser').user
    ], (event, user) => {
    let clone = Object.assign({}, event);
    delete clone._id;
    clone.participants.push({
        userId: user.id,
        acknowledged: false,
        accepted: false
    })
    return clone;
});