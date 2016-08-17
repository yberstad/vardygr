import { createSelector } from 'reselect';

export default createSelector((state) => state.get('position'), (position) => {
    return position.location;
});