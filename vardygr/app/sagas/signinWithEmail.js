import ddpClient from '../ddp';
import { SIGN_IN_EMAIL } from '../constants/actions';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import signInEmailFailure from '../actions/signInEmailFailure';
import loggedInSuccess from '../actions/loggedInSuccess';

const trimString = (str) => str.replace(/^\s+|\s+$/gm,'');

function* signInWithEmail(action) {
    try {
        let params = {
            user: {
                email: trimString(action.payload.email)
            },
            password: ddpClient.sha256(action.payload.password)
        };
        const user = yield call(ddpClient.callPromise, 'login', [params]);
        yield put(loggedInSuccess(user));
    }
    catch(err)
    {
        yield put(signInEmailFailure(err));
    }
}

export function* watchSignInWithEmail() {
    yield* takeLatest(SIGN_IN_EMAIL, signInWithEmail);
}