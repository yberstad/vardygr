import { getFacebookFriends } from '../facebook';
import { APP_FACEBOOK_GET_FRIENDS } from '../constants/actions';
import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import appFacebookGetFriendsFailure from '../actions/appFacebookGetFriendsFailure';
import appFacebookGetFriendsSuccess from '../actions/appFacebookGetFriendsSuccess';

function* callFacebookFriends() {
    try {
        const result = yield call(getFacebookFriends);
        yield put(appFacebookGetFriendsSuccess(result));
    }
    catch (error) {
        yield put(appFacebookGetFriendsFailure(error));
    }
}


export function* watchGetFacebookFriends() {
    yield* takeLatest(APP_FACEBOOK_GET_FRIENDS, callFacebookFriends)
}


