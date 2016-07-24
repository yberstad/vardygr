import ddpClient from '../ddp';
import { EVENT_GET_LIST } from '../constants/actions';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import eventGetListFailure from '../actions/eventGetListFailure';
import eventGetListSuccess from '../actions/eventGetListSuccess';

function* getEventList() {
    try {
        const eventList = yield call(ddpClient.callPromise, 'getEventList', []);
        yield put(eventGetListSuccess(eventList));
    }
    catch (error) {
        yield put(eventGetListFailure(error));
    }
}

export function* watchEventGetList() {
    yield* takeLatest(EVENT_GET_LIST, getEventList)
}