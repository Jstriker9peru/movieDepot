import { closeModal } from './modalActions';
import { SubmissionError } from 'redux-form';
import { loadFirebase } from '../../lib/db';

export const SignIn = (creds) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password);
            dispatch(closeModal());
        } catch (error) {
            // console.log(error);
            throw new SubmissionError({
                _error: error.message
            })
        }
        dispatch(closeModal())
    }
}

const firebase1= loadFirebase();

export const SignUp = (user) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        console.log('This is firebase1', firebase1);
        console.log('This is firebase',firebase);
        const firestore = getFirestore();
        console.log('This is firestore', firestore);
        try {
            // create the user in auth
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            console.log('This is a new created user', createdUser);
            // update the auth profile
            await createdUser.user.updateProfile({
                firstName: user.firstName,
                lastName: user.lastName
            })
            // create a new profile in firestore
            let newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: firestore.FieldValue.serverTimestamp()
            }
            await firestore.set(`users/${createdUser.user.uid}`, {...newUser});
            dispatch(closeModal());
        } catch (error) {
            console.log(error);
            throw new SubmissionError({
                _error: error.message
            })
        }
    }



