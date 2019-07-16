import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import {
  addFavorite,
  removeFavorite
} from "../../modules/actions/favoritesActions";
import { useFirestore, useFirebase } from "react-redux-firebase";
import "./ToggleFavorite.scss";

const ToggleFavorite = ({
  info,
  authUser,
  favorites,
  addFavorite,
  removeFavorite,
  isButton,
  id
}) => {
  const favorited = favorites.some(favorite => id === favorite.id);
  const firestore = useFirestore();
  const firebase = useFirebase();
  const toggleFavorited = info => {
    if (authUser.currentUser) {
      if (favorited) {
        removeFavorite(info, firestore, firebase);
      } else {
        addFavorite(info, firestore, firebase);
      }
    }
  };

  return (
    <React.Fragment>
      {isButton ? (
        <Button
          className="button2"
          variant="contained"
          color="primary"
          onClick={() => toggleFavorited(info)}
        >
          {favorited ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      ) : (
        <div
          className="favorite-icon-container"
          onClick={() => toggleFavorited(info)}
        >
          {favorited ? (
            <i
              title="Remove from favorites"
              className="material-icons favorite-icon-full"
            >
              star
            </i>
          ) : (
            <i
              title="Add to favorites"
              className="material-icons favorite-icon"
            >
              star_border
            </i>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addFavorite: (movieInfo, firestore, firebase) => {
      dispatch(addFavorite(movieInfo, { firestore, firebase }));
    },
    removeFavorite: (movieInfo, firestore, firebase) => {
      dispatch(removeFavorite(movieInfo, { firestore, firebase }));
    }
  };
};

const mapStateToProps = state => ({
  authUser: state.auth,
  favorites: state.favoritesData.favorites
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleFavorite);
