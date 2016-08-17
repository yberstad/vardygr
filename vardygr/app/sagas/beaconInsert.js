import ddpClient from '../ddp';
import { BEACON_INSERT } from '../constants/actions';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import beaconInsertFailure from '../actions/beaconInsertFailure';
import beaconInsertSuccess from '../actions/beaconInsertSuccess';
import beaconInsertSelector from '../selectors/beaconInsert';

function* beaconInsert() {
    try {
        const beaconToInsert = yield select(beaconInsertSelector);
        const id = yield call(ddpClient.callPromise, 'beaconInsert', [beaconToInsert]);
        yield put(beaconInsertSuccess(id));
    }
    catch (error) {
        yield put(beaconInsertFailure(error));
    }
}


export function* watchBeaconInsert() {
    yield* takeLatest(BEACON_INSERT, beaconInsert)
}


