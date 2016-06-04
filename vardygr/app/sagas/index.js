import { fork } from 'redux-saga/effects';
import { watchSignInWithEmail } from './signInWithEmail';
import { watchSignUpWithEmail } from './signUpWithEmail';
import { watchSignInWithFacebook } from './signInWithFacebook';
import { watchSignOutWithFacebook } from './signOutWithFacebook';
import { watchSaveEvent } from './saveEvent';
import { watchEventGetList } from './getEventList';
import { watchAddPosition } from './addPosition';
/*
 * The entry point for all the sagas used in this application.
 */
export default function *root() {
    yield [
        fork(watchSignInWithEmail),
        fork(watchSignUpWithEmail),
        fork(watchSaveEvent),
        fork(watchSignInWithFacebook),
        fork(watchSignOutWithFacebook),
        fork(watchEventGetList),
        fork(watchAddPosition)
    ];
}