// import ddpClient from '../ddp';
// import { POSITION_ADD } from '../constants/actions';
// import { takeLatest } from 'redux-saga';
// import { call, put, select } from 'redux-saga/effects';
// import positionAddFailure from '../actions/positionAddFailure';
// import positionAddSuccess from '../actions/positionAddSuccess';
// import newPositionSelector from '../selectors/newPosition';
//
// function* addPosition() {
//     try {
//         const positionToAdd = yield select(newPositionSelector);
//         const id = yield call(ddpClient.callPromise, 'addPosition', [positionToAdd]);
//         yield put(positionAddSuccess(id));
//     }
//     catch (error) {
//         yield put(positionAddFailure(error));
//     }
// }
//
//
// export function* watchAddPosition() {
//     yield* takeLatest(POSITION_ADD, addPosition)
// }


