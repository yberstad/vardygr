import { fork } from 'redux-saga/effects';
import { watchSignInWithEmail } from './signInWithEmail';

/*
 * The entry point for all the sagas used in this application.
 */
export default function *root() {
    yield [
         fork(watchSignInWithEmail)
    ];
}