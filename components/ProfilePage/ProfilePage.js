import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PhotoCard from '../PhotoCard/PhotoCard';
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { reduxForm, Field } from 'redux-form';
import { useFirebase, useFirestore, firestoreConnect } from "react-redux-firebase";
import { updateProfile } from '../../modules/actions/authActions';
import { uploadProfileImage } from '../../modules/actions/imageActions';
import './ProfilePage.scss';

const validate = values => {
    const errors = {};
    const requiredFields = [
     'displayName',
     'lastName'
    ];
    requiredFields.forEach(field => {
     if (!values[field]) {
       errors[field] = '*This field is required';
     }
    });
    console.log('Errors inside Profile Page validate', errors);
    return errors;
}

 const renderTextField = (
    { input, label, type, defaultValue, meta: { touched, error } }
  ) => {
    let isRequired = input.name === "dateOfBirth" || input.name === "country" ? false : true; 
    let hasError = error ? true : false;
    return (
        <div>
            <TextField
            variant="outlined"
            required={isRequired}
            fullWidth
            id={input.name}   
            label={label}
            defaultValue={defaultValue}
            error={touched && hasError}
            type={type}
            InputLabelProps={{
                shrink: true,
            }}
            {...input}
            />
            {touched && error && <span className="error-text">{error}</span>}
        </div>
)};

const ProfilePage = ({ authUser, auth, profile, photos, handleSubmit, update, uploadImage, pristine, submitting, invalid, router }) => {

    const firebase = useFirebase();
    const firestore = useFirestore();
    const [fileInfo, setFileInfo] = useState(null); 
    const { displayName } = authUser.currentUser;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const mainPhoto = photos ? photos.filter(photo => photo.url === profile.photoURL) : null;
    console.log('this is the main photo', mainPhoto);
    const otherPhotos = photos ? photos.filter(photo => photo.url !== profile.photoURL) : null; 
    console.log('These are the other photos', otherPhotos);
    const photoList = (mainPhoto && otherPhotos) ? [...mainPhoto, ...otherPhotos] : null;
    console.log('These is the photoList', photoList);

    const updateProfile = (info) => {
        update(firestore, firebase, info);
    }

    const onDrop = (file) => {
        console.log('Something has been dropped', file);
        setFileInfo(file);
        uploadImage(firestore, firebase, file);
    
    }

    return (
        <div className="profile-page-container">
            <div className="profile-page">
                <div className="title">
                    <Avatar className="profile-avatar" src={profile.photoURL ? profile.photoURL : '/static/noImageFound.jpg'} />
                    {displayName && (
                        <h1 className="name">
                            <span style={{ textTransform: 'capitalize'}}>{displayName}</span>'s Profile
                        </h1>
                    )}
                    <style jsx>{`
                        Avatar.profile-avatar {
                            width: 3em;
                            height: 3em;
                            border: 1px solid black;
                            margin-right: 5px;
                        }
                    `}</style>
                </div>
                {authUser.currentUser && (
                <form className="info-form" onSubmit={handleSubmit(updateProfile)} >
                    <h3>Basic Info</h3>
                    <Grid className="grid" container spacing={0}>
                        <Grid className="grid-item" item xs={12} sm={7}>
                            <Field
                                name="displayName"
                                label="First Name"
                                type="text"
                                component={renderTextField}
                            />
                        </Grid>

                        <Grid className="grid-item" item xs={12} sm={7}>
                            <Field
                                name="lastName"
                                label="Last Name"
                                type="text"
                                component={renderTextField}
                            />
                        </Grid>

                        <Grid className="grid-item" item xs={12} sm={7}>
                            <Field
                                name="dateOfBirth"
                                label="Date of Birth"
                                type="date"
                                component={renderTextField}
                            />
                        </Grid>

                        <Grid className="grid-item" item xs={12} sm={7}>
                            <Field
                                name="country"
                                label="Country"
                                type="text"
                                component={renderTextField}
                            />
                        </Grid>
                    </Grid>
                    <Button 
                        disabled={pristine || invalid || submitting}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Update
                    </Button>
                </form> )}
                <div>
                    <h3>My Images</h3>
                    <div>
                        <div>Choose a main photo</div>

                        <div className="photos-container">
                            {photoList && photoList.map(photo => {
                                return (
                                    <PhotoCard key={photo.id} photoInfo={photo} />
                                )
                            })}
                        </div>

                        <Dropzone onDrop={onDrop} multiple={false}>
                            {({ getRootProps, getInputProps }) => (
                            <div 
                            {...getRootProps()}
                            className="drop-container"
                            style={{ 
                                height: "10em",
                                width: "10em",
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <input {...getInputProps()} />
                                <p>Drop an image</p>
                                <p>or</p>
                                <p>Click here</p>
                            </div>
                            )}
                        </Dropzone>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authUser: state.auth,
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        initialValues: state.auth.currentUser,
        photos: state.firestore.ordered.photos
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (firestore, firebase, info) => {
            dispatch(updateProfile({ firestore, firebase }, info))
        },
        uploadImage: (firestore, firebase, file) => {
            dispatch(uploadProfileImage({ firestore, firebase }, file))
        }
    }
}

const query = (props) => {
    console.log('this is the auth', props);
    return [
      {
        collection: "users",
        doc: `${props.auth.uid}`,
        subcollections: [{ collection: "photos" }],
        storeAs: "photos"
      }
    ];
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    reduxForm({
        form: 'ProfileInfo',
        validate,
        enableReinitialize: true,
        destroyOnUnmount: false
    }),
    firestoreConnect(props => query(props)),
)(ProfilePage);
