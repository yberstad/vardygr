import ddpClient from '../ddp';
import { SIGNUP_EMAIL } from '../constants/actions';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import signUpEmailFailure from '../actions/signUpEmailFailure';
import signUpEmailSuccess from '../actions/signUpEmailSuccess';

const trimString = (str) => str.replace(/^\s+|\s+$/gm,'');

function* signUpWithEmail(action) {
    try {
        let params = {
            email: trimString(action.email),
            password: ddpClient.sha256(action.password)
        };
        
        // const user = yield call(ddpClient.callPromise, 'createUser', [params], (err, res) => {
        //     ddpClient.onAuthResponse(err, res);
        // });

        const user = yield call(ddpClient.callPromise, 'createUser', [params]);
        yield call(ddpClient.persistUser, user);

        yield put(signUpEmailSuccess(user));
    }
    catch(err)
    {
        yield put(signUpEmailFailure(err));
    }
}

export function* watchSignUpWithEmail() {
    yield* takeLatest(SIGNUP_EMAIL, signUpWithEmail);
}