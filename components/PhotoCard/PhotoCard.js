import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Notification from "../Notification/Notification";
import { connect } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { setMainPhoto, deletePhoto } from "../../modules/actions/imageActions";
import "./PhotoCard.scss";

const PhotoCard = ({ setMain, deletePhoto, profile, photoInfo }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const isMain = profile.photoURL === photoInfo.url;
  const handleSetMain = () => {
    try {
      setMain(firestore, firebase, photoInfo.url);
      setOpen(true);
      setMessage('Main Photo Set')
    } catch (error) {
      setOpen(true);
      setMessage('Error Occurred');
    }
  };

  const handleDeletePhoto = () => {
    try {
      deletePhoto(firestore, firebase, photoInfo, isMain);
      setOpen(true);
      setMessage('Photo deleted')
    } catch (error) {
      setOpen(true);
      setMessage('Error deleting photo');
    }
  };
  return (
    <React.Fragment>
    <Card className="card-style">
      <CardMedia component="img" height="180" alt="profile pic" image={photoInfo.url} />
      <CardActions>
        <Button
          className="main-btn"
          disabled={isMain}
          onClick={handleSetMain}
          size="small"
          color="primary"
        >
          Main
        </Button>
        <Button
          className="delete-btn"
          onClick={handleDeletePhoto}
          size="small"
          color="primary"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
    <Notification message={message} isOpen={isOpen} setOpen={setOpen} />
    </ React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMain: (firestore, firebase, url) => {
      dispatch(setMainPhoto({ firestore, firebase }, url));
    },
    deletePhoto: (firestore, firebase, photoInfo, isMain) => {
      dispatch(deletePhoto({ firestore, firebase }, photoInfo, isMain));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoCard);
