import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import {
  addFavorite,
  removeFavorite
} from "../../modules/actions/favoritesActions";
import Notification from "../Notification/Notification";
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
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const toggleFavorited = info => {
    try {
      if (authUser.currentUser) {
        if (favorited) {
          removeFavorite(info, firestore, firebase);
          setOpen(true);
          setMessage('Removed from favorites');
        } else {
          addFavorite(info, firestore, firebase);
          setOpen(true);
          setMessage('Added to favorites');
        }
      }

    } catch (error) {
      setOpen(true);
      setMessage('Error Occurred');
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
      <Notification message={message} isOpen={isOpen} setOpen={setOpen} />
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
