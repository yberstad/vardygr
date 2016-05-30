import { createSelector } from 'reselect';

export default createSelector((state) => state.get('createEvent'), (event) => {
    let clone = Object.assign({}, event);
    delete clone.id;
    console.log(JSON.stringify(clone));
    return clone;
});