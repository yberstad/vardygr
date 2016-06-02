import ddpClient from '../ddp';
import { EVENT_GET_LIST } from '../constants/actions';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { eventGetListFailure } from '../actions/eventGetListFailure';
import { eventGetListSuccess } from '../actions/eventGetListSuccess';

function* getEventList() {
    try {
        const eventList = yield call(ddpClient.callPromise, 'getEventList');
        yield eventGetListSuccess(eventList);
    }
    catch (error)
    {
        yield eventGetListFailure(error);
    }
}

export function* watchEventGetList() {
    yield* takeLatest(EVENT_GET_LIST, getEventList)
}