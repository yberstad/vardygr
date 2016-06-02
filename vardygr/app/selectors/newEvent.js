import { createSelector } from 'reselect';

export default createSelector((state) => state.get('currentEvent'), (event) => {
    let clone = Object.assign({}, event);
    delete clone.selectedId;
    console.log(JSON.stringify(clone));
    return clone;
});