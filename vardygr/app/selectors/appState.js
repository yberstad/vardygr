import { createSelector } from 'reselect';

export default createSelector((state) => state.get('app'), (appState) => {
    return appState;
});