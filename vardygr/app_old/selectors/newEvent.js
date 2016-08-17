import { createSelector } from 'reselect';

export default createSelector(
    [
        (state) => state.get('currentEvent'),
        (state) => state.get('currentUser').user
    ], (event, user) => {
    let clone = Object.assign({}, event);
    delete clone._id;
    clone.participants.push({
        facebookId: user.services.facebook.id,
        acknowledged: false,
        accepted: false,
        displayName: user.services.facebook.name
    })
    return clone;
});