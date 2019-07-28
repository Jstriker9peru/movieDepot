import { GET_FAVORITES } from "./favoritesConstants";

export const removeFavorite = (
  movieInfo,
  { firestore, firebase }
) => async dispatch => {
  const user = firebase.auth().currentUser;
  try {
    // Remove document from favorites
    await firestore
      .delete({
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "favorites", doc: `${movieInfo.id}` }]
      })
      .then(() => {
        dispatch(getFavorites({ firestore, firebase }));
      });
  } catch (error) {
    console.log("This is the removeFavorite error", error);
  }
};

export const addFavorite = (
  movieInfo,
  { firestore, firebase }
) => async dispatch => {
  const user = firebase.auth().currentUser;
  if (user) {

    try {
      // Add document to favorites
      await firestore
        .set(
          {
            collection: "users",
            doc: user.uid,
            subcollections: [
              {
                collection: "favorites",
                doc: `${movieInfo.id}`
              }
            ]
          },
          {
            id: movieInfo.id,
            title: movieInfo.title,
            poster: movieInfo.poster_path
          }
        )
        .then(() => {
          dispatch(getFavorites({ firestore, firebase }));
        });
    } catch (error) {
      console.log(error);
    }
  }
};

export const getFavorites = ({ firestore, firebase }) => async dispatch => {
  let currentUser = firebase.auth().currentUser;
  let favorites;
  if (currentUser) {
    // Get all documents from favorites
    favorites = await firestore
      .collection("users")
      .doc(`${currentUser.uid}`)
      .collection("favorites")
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(doc => {
          return doc.data();
        });
      })
      .catch(error => console.log("Could not get favorites", error));
    dispatch({ type: GET_FAVORITES, payload: favorites });
  }
};
