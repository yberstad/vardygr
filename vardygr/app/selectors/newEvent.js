import { createSelector } from 'reselect';

export default createSelector((state) => state.get('currentEvent'), (event) => {
    let clone = Object.assign({}, event);
    delete clone._id;
    console.log(JSON.stringify(clone));
    return clone;
});