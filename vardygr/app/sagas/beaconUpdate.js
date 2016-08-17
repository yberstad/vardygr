import ddpClient from '../ddp';
import { BEACON_UPDATE } from '../constants/actions';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import beaconUpdateFailure from '../actions/beaconUpdateFailure';
import beaconUpdateSuccess from '../actions/beaconUpdateSuccess';
import beaconToUpdateSelector from '../selectors/beaconToUpdate';
import newPositionSelector from '../selectors/newPosition';

function* beaconUpdate() {
    try {
        const beaconToUpdate = yield select(beaconToUpdateSelector);
        const location = yield select(newPositionSelector);
        yield call(ddpClient.callPromise, 'beaconUpdate', [beaconToUpdate._id, location]);
        yield put(beaconUpdateSuccess(beaconToUpdate._id));
    }
    catch (error) {
        yield put(beaconUpdateFailure(error));
    }
}


export function* watchBeaconUpdate() {
    yield* takeLatest(BEACON_UPDATE, beaconUpdate)
}


