import { fork } from 'redux-saga/effects';
//import startup  from './startup';
import { watchLoggedInSuccess } from './initAfterSignInSuccess';
import { watchSignInWithEmail } from './signInWithEmail';
import { watchSignUpWithEmail } from './signUpWithEmail';
import { watchSignInWithFacebook } from './signInWithFacebook';
import { watchSignOutWithFacebook } from './signOutWithFacebook';
import { watchSaveEvent } from './saveEvent';
import { watchEventGetList } from './getEventList';
//import { watchAddPosition } from './addPosition';
import { watchGetFacebookFriends } from './getFacebookFriends';
import { watchBeaconInsert } from './beaconInsert';
import { watchBeaconUpdate } from './beaconUpdate';
/*
 * The entry point for all the sagas used in this application.
 */
export default function *root() {
    yield [
        fork(watchLoggedInSuccess),
        fork(watchSignInWithEmail),
        fork(watchSignUpWithEmail),
        fork(watchSaveEvent),
        fork(watchSignInWithFacebook),
        fork(watchSignOutWithFacebook),
        fork(watchEventGetList),
        //fork(watchAddPosition),
        fork(watchGetFacebookFriends),
        fork(watchBeaconInsert),
        fork(watchBeaconUpdate)
        //fork(startup)
    ];
}