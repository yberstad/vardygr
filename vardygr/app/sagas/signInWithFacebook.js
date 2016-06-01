import ddpClient from '../ddp';
import { SIGNIN_FACEBOOK } from '../constants/actions';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import signInFacebookFailure from '../actions/signInFacebookFailure';
import loggedInSuccess from '../actions/loggedInSuccess';

function* signInWithFacebook(action) {
    try {
        let params = { facebook: action.result };

        const user = yield call(ddpClient.callPromise, 'login', [params]);
        yield call(ddpClient.persistUser, user);

        yield put(loggedInSuccess(user));
    }
    catch(err)
    {
        yield put(signInFacebookFailure(err));
    }
}

export function* watchSignInWithFacebook() {
    yield* takeLatest(SIGNIN_FACEBOOK, signInWithFacebook);
}