import ddpClient from '../ddp';
import { EVENT_SAVE } from '../constants/actions';
import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/Effects';
import saveEventFailure from '../actions/eventSaveFailure';
import saveEventSuccess from '../actions/eventSaveSuccess';

function* saveEvent(action) {
    try {
        
        const event = yield call(ddpClient.call, 'saveEvent', [action.event]);
        yield put(saveEventSuccess(event));
    }
    catch (error) {
        yield put(saveEventFailure(error));
    }
}


export function* watchSaveEvent() {
    yield* takeLatest(EVENT_SAVE, saveEvent)
}


