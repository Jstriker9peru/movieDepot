import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { useFirebase } from "react-redux-firebase";
import { closeModal } from "../../modules/actions/modalActions";
import { SignIn, formError } from "../../modules/actions/authActions";
import "./SignInModal.scss";

const renderTextField = ({ input, label, type, meta: { touched, error } }) => {
  let hasError = error ? true : false;
  return (
    <div>
      <TextField
        variant="outlined"
        required
        fullWidth
        id={input.name}
        label={label}
        error={touched && hasError}
        type={type}
        {...input}
      />
      {touched && error && <span className="error-text">{error}</span>}
    </div>
  );
};

const renderCheckbox = ({ input, label }) => (
  <FormControlLabel
    control={
      <Checkbox value="remember" color="primary" onChange={input.onChange} />
    }
    label={label}
    onChange={input.onChange}
    checked={input.value ? true : false}
  />
);

const validate = values => {
  const errors = {};
  const requiredFields = ["email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true;
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const SignInModal = ({
  invalid,
  handleSubmit,
  submitting,
  formError,
  errorFromForm,
  closeModal,
  signInUser
}) => {
  const [open, setOpen] = React.useState(true);
  const firebase = useFirebase();
  let error =
    errorFromForm && errorFromForm.message ? errorFromForm.message : null;

  const SignInUser = creds => {
    signInUser(creds, firebase);
  };

  const handleClose = () => {
    setOpen(false);
    closeModal();
    formError();
  };

  return (
    <Modal
      className="sign-in-modal"
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className="sign-in-container">
        <div className="sign-in">
          <Avatar className="lock">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="sign-in-form" onSubmit={handleSubmit(SignInUser)}>
            <Grid className="grid" container spacing={0}>
              <Grid className="grid-item" item xs={12} sm={12}>
                <Field
                  name="email"
                  label="Email Address"
                  component={renderTextField}
                  type="email"
                />
              </Grid>
              <Grid className="grid-item" item xs={12} sm={12}>
                <Field
                  name="password"
                  label="Password"
                  component={renderTextField}
                  type="password"
                />
              </Grid>
              <Grid className="remember" item xs={12} sm={12}>
                <Field
                  name="remember me"
                  component={renderCheckbox}
                  type="checkbox"
                  label="Remember me"
                />
                {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                /> */}
              </Grid>
              <Grid className="grid-item" item xs={12} sm={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit-btn"
                  disabled={invalid || submitting}
                >
                  Sign In
                </Button>
              </Grid>
              {error && (
                <Grid className="grid-item error-text">
                  <span>{error}</span>
                </Grid>
              )}
              <Grid className="grid-item" item>
                <Link href="#" variant="body2">
                  {"No account yet? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(closeModal());
    },
    signInUser: (creds, firebase) => {
      dispatch(SignIn({ firebase }, creds));
    },
    formError: () => {
      dispatch(formError(null));
    }
  };
};

const mapStateToProps = state => ({
  errorFromForm: state.auth.formError
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({
    form: "SignIn",
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: false
  })
)(SignInModal);
