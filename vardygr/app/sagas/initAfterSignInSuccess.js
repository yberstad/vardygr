import {store} from '../index';
import {startGeoTracking} from '../geoTracking';
import { LOGGED_IN_SUCCESS } from '../constants/actions';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import eventGetList from '../actions/eventGetList';
import appFacebookGetFriends from '../actions/appFacebookGetFriends';


function* init() {
    try {
        yield put(store.dispatch(eventGetList()));
        yield put(store.dispatch(appFacebookGetFriends()));
        yield call(startGeoTracking);
    }
    catch(err)
    {
        console.log(err);
    }
}

export function* watchLoggedInSuccess() {
    yield* takeLatest(LOGGED_IN_SUCCESS, init);
}

// These methods need to be called once the user is logged in, it's now only called the second time the app is started and not on the initial login.
