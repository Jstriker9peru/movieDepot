import { ADD_FAVORITE, REMOVE_FAVORITE, GET_FAVORITES } from './favoritesConstants';

// export const addFavorite = (movieInfo) => {
//     return {
//         type: ADD_FAVORITE,
//         payload: movieInfo
//     }
// }

export const removeFavorite = (movieInfo, { firestore, firebase }) =>
    async (dispatch, getState) => {
        const state = getState();
        const user = state.auth.currentUser;

        try {
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{ collection: 'favorites', doc: `${movieInfo.id}`}]
            }).then(() => {
                dispatch(getFavorites({ firestore, firebase }))
            }).catch(error => console.log('remove Error', error))
        } catch (error) {
            console.log('This is the removeFavorite error', error);
        }
    }

export const addFavorite = (movieInfo, { firestore, firebase }) =>
    async (dispatch, getState) => {
        const state = getState();
        const user = state.auth.currentUser;
        console.log('This is firestore add', firestore);
        console.log('user.uid', typeof(user.uid));
        console.log('This is the movieinfo', movieInfo);
        try {
            await firestore.set({
                collection: 'users',
                doc: user.uid,
                subcollections: [{
                    collection: 'favorites', doc: `${movieInfo.id}`
                }]
            }, {
                id: movieInfo.id,
                title: movieInfo.title,
                poster: movieInfo.poster_path
            }).then(() => {
                dispatch(getFavorites({ firestore, firebase }))
            }).catch(error => console.log('add Error', error));
        } catch (error) {
            console.log(error);
        }
    }

export const getFavorites = ({ firestore, firebase }) =>
    async (dispatch, getState) => {
        console.log('This firestore', firestore);
        console.log('This firebase', firebase);
        let currentUser = firebase.auth().currentUser;
        let favorites;
        console.log('This is the getFavorites current user', currentUser);
        if (currentUser) {
            console.log(2);
            favorites =  await firestore
                .collection('users')
                .doc(`${currentUser.uid}`)
                .collection('favorites')
                .get()
                .then(querySnapshot => {
                    return querySnapshot.docs.map(doc => {
                        return doc.data();
                        // console.log('This is doc', doc.data());
                    })
                })
                .catch(error => console.log('Could not get favorites', error));
            console.log('These are the favorites', favorites);
            dispatch({ type: GET_FAVORITES, payload: favorites });
        } 
        
    }