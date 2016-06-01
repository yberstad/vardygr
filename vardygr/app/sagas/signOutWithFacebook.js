import ddpClient from '../ddp';
import { SIGNOUT_FACEBOOK } from '../constants/actions';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { signOutFacebook } from '../actions/signOutFacebook';
import { signOutFacebookFailure } from '../actions/signOutFacebookFailure';
import { signOutFacebookSuccess } from '../actions/signOutFacebookSuccess';


function* signOutWithFacebook() {
    try {
        yield call(ddpClient.logout);
        yield put(signOutFacebookSuccess(user));
    }
    catch(err)
    {
        yield put(signOutFacebookFailure(err));
    }
}

export function* watchSignOutWithFacebook() {
    yield* takeLatest(SIGNOUT_FACEBOOK, signOutWithFacebook);
}