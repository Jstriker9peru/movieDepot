import { closeModal, openModal } from './modalActions';
import { SubmissionError } from 'redux-form';
import { FETCH_USER, LOGOUT, FORM_ERROR } from './authConstants';
// import { loadFirebase } from '../../lib/db';


export const SignIn = ({ firebase }, creds) => {
    return async (dispatch, getState) => {
        let state = getState();
        console.log('These are the signin creds', creds);
        console.log('This is firebase', firebase);
        console.log('This is getState', state);
        try {
            await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
            .then(user => {
                console.log('This is the signed in user', user)
                console.log('Signed In');
                dispatch(closeModal());
                dispatch(formError(null));
            })
            .catch(error => {
                dispatch(formError(error))
                dispatch(closeModal());
                console.log('This is a sign in error', error.message);
                throw new SubmissionError({
                    _error: error.message
                })
            })
        } catch (error) {
            dispatch(openModal('SignInModal'));
            console.log('SignIn Unsuccessful');
        }
        // dispatch(closeModal())
    }
}


export const SignUp = ({ firestore, firebase }, user) => 
    async (dispatch, getState) => {
        console.log('This is the user', user);
        try {
            // create the user in auth
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
            // update the auth profile
            await createdUser.user.updateProfile({
                displayName: user.firstName,
                lastName: user.lastName
            })
            // create a new profile in firestore
            let newUser = {
                displayName: user.firstName,
                lastName: user.lastName,
                createdAt: firestore.FieldValue.serverTimestamp()
            }
            await firestore.set(`users/${createdUser.user.uid}`, {...newUser});
            dispatch(closeModal());
            dispatch(formError(null));
        } catch (error) {
            console.log('Error inside signup function',error);
            dispatch(formError(error));
            
        }
    }

    export const fetchUser = (user) => {
        console.log('starting...');
        return {
            type: FETCH_USER,
            payload: user
        }
    }

    export const logOut = () => {
        return {
            type: LOGOUT,
        }
    }

    export const formError = (error) => {
        return {
            type: FORM_ERROR,
            payload: error
        }
    }
      



