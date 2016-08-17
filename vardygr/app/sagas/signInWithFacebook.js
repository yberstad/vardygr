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

        const userDetailed = yield call(ddpClient.callPromise, 'getUser');
        let beacon = yield call(ddpClient.callPromise, 'getBeaconsForLoggedInUser');
        if(beacon == null){
            let beaconToInsert = {};

            beaconToInsert.public = false;
            beaconToInsert.createWayPoints = false;
            beaconToInsert.usedBy = userDetailed._id;
            beaconToInsert.usedByFacebookId = userDetailed.services.facebook.id;

            yield call(ddpClient.callPromise, 'insertBeacon' [beaconToInsert]);
            beacon = yield call(ddpClient.callPromise, 'getBeaconsForLoggedInUser');
        }
        yield put(loggedInSuccess(userDetailed, beacon));
    }
    catch(err)
    {
        yield put(signInFacebookFailure(err));
    }
}

export function* watchSignInWithFacebook() {
    yield* takeLatest(SIGNIN_FACEBOOK, signInWithFacebook);
}

