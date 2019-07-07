import React from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { reduxForm, Field } from 'redux-form';
import { updateProfile } from '../../modules/actions/authActions';
import { useFirebase, useFirestore } from "react-redux-firebase";
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

const ProfilePage = ({ authUser, handleSubmit, update, pristine, submitting, invalid, router }) => {
    // const router = useRouter();
    console.log('This is the router in the profile page', router);
    const firebase = useFirebase();
    const firestore = useFirestore();
    const { displayName } = authUser.currentUser;

    const updateProfile = (info) => {
        update(firestore, firebase, info);
    }
    return (
        <div className="profile-page-container">
            <div className="profile-page">
                <div className="title">
                    <Avatar className="profile-avatar" src="/static/courage.jpg" />
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
                        <div>Choose a photo</div>

                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authUser: state.auth,
        initialValues: state.auth.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        update: (firestore, firebase, info) => {
            dispatch(updateProfile({ firestore, firebase }, info))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    reduxForm({
        form: 'ProfileInfo',
        validate,
        enableReinitialize: true,
        destroyOnUnmount: false
    })
)(ProfilePage);
