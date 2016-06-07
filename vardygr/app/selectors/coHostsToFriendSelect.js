import { createSelector } from 'reselect';

export default createSelector(
    [(state) => state.get('currentEvent').coHosts],
    (coHosts) => {
        let coHostsList = [];
        coHosts.map((coHost) => {
            coHostsList.push(coHost.userId);
        });
        return coHostsList;
    }
);
