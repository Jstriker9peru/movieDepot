import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { closeModal } from "../../modules/actions/modalActions";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { SignUp, formError } from "../../modules/actions/authActions";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "./SignUpModal.scss";

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

const validate = values => {
  const errors = {};
  const requiredFields = ["firstName", "lastName", "email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (values.password && values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  return errors;
};

const SignUpModal = ({
  invalid,
  handleSubmit,
  submitting,
  closeModal,
  signUpUser
}) => {
  const [open, setOpen] = React.useState(true);
  const firestore = useFirestore();
  const firebase = useFirebase();

  const SignUpUser = creds => {
    signUpUser(creds, firestore, firebase);
  };

  const handleClose = () => {
    setOpen(false);
    closeModal();
    formError(null);
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
            Sign Up
          </Typography>
          <form className="sign-in-form" onSubmit={handleSubmit(SignUpUser)}>
            <Grid className="grid" container spacing={0}>
              <Grid className="grid-item" item xs={12} sm={6}>
                <Field
                  name="firstName"
                  label="First Name"
                  component={renderTextField}
                  type="text"
                />
              </Grid>
              <Grid className="grid-item" item xs={12} sm={6}>
                <Field
                  name="lastName"
                  label="Last Name"
                  component={renderTextField}
                  type="text"
                />
              </Grid>
              <Grid className="grid-item" item xs={12}>
                <Field
                  name="email"
                  label="Email Address"
                  component={renderTextField}
                  type="email"
                />
              </Grid>
              <Grid className="grid-item bottom" item xs={12}>
                <Field
                  name="password"
                  label="Password"
                  component={renderTextField}
                  type="password"
                />
              </Grid>
              <Grid className="grid-item" item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="submit-btn"
                  disabled={invalid || submitting}
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid className="grid-item" item>
                <Link href="#" variant="body2">
                  {"Already have an account? Sign In"}
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
    signUpUser: (creds, firestore, firebase) => {
      dispatch(SignUp({ firestore, firebase }, creds));
    },
    formError: () => {
      dispatch(formError(null));
    }
  };
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  reduxForm({
    form: "SignUp",
    validate,
    enableReinitialize: true
  })
)(SignUpModal);
