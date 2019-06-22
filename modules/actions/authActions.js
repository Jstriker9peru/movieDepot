import { closeModal } from './modalActions';
import { SubmissionError } from 'redux-form';
import { FETCH_USER } from './authConstants';
// import { loadFirebase } from '../../lib/db';


export const SignIn = ({ firebase }, creds) => {
    return async (dispatch, getState) => {
        console.log('These are the signin creds', creds);
        console.log('This is firebase', firebase);
        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password).then(user => console.log('This is the signed in user', user)).catch(error => console.log('This is a sign in error', error.message));
            console.log('Signed In');
            dispatch(closeModal());
        } catch (error) {
            console.log('SignIn Unsuccessful');
            throw new SubmissionError({
                _error: error.message
            })
        }
        dispatch(closeModal())
    }
}


export const SignUp = ({ firestore, firebase }, user) => 
    async (dispatch, getState) => {
        console.log('This is the user', user);
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

    export const fetchUser = (user) => {
        return {
            type: FETCH_USER,
            payload: user
        }
    }
      



