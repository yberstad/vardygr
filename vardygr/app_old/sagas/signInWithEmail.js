import ddpClient from '../ddp';
import { SIGNIN_EMAIL } from '../constants/actions';
import { call, put, csp } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import signInEmailFailure from '../actions/signInEmailFailure';
import loggedInSuccess from '../actions/loggedInSuccess';

const trimString = (str) => str.replace(/^\s+|\s+$/gm,'');

function* signInWithEmail(action) {
    try {
        let params = {
            user: {
                email: trimString(action.email)
            },
            password: ddpClient.sha256(action.password)
        };

        const user = yield call(ddpClient.callPromise, 'login', [params]);
        yield call(ddpClient.persistUser, user);

        yield put(loggedInSuccess(user));
    }
    catch(err)
    {
        yield put(signInEmailFailure(err));
    }
}

export function* watchSignInWithEmail() {
    yield* takeLatest(SIGNIN_EMAIL, signInWithEmail);
}