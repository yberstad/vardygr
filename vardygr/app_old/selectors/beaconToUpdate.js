import { createSelector } from 'reselect';

export default createSelector((state) => state.get('currentUser'), (currentUser) => {
    return currentUser.beacon;
});