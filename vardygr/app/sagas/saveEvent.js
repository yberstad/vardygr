import ddpClient from '../ddp';
import { EVENT_SAVE } from '../constants/actions';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import saveEventFailure from '../actions/eventSaveFailure';
import saveEventSuccess from '../actions/eventSaveSuccess';
import newEventSelector from '../selectors/newEvent';

function* saveEvent() {
    try {
        const eventToSave = yield select(newEventSelector);
        console.log(JSON.stringify(eventToSave));
        const id = yield call(ddpClient.callPromise, 'saveEvent', [eventToSave]);
        yield put(saveEventSuccess(id));
    }
    catch (error) {
        yield put(saveEventFailure(error));
    }
}


export function* watchSaveEvent() {
    yield* takeLatest(EVENT_SAVE, saveEvent)
}


