import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Field, reduxForm } from 'redux-form';
import './SignInModal.scss';

const renderTextField = (
    { input, label, type, meta: { touched, error } }
  ) => {
    return (
    <TextField
      variant="outlined"
      required
      fullWidth
      id={input.name}   
      label={label}
      error={touched && error}
      type={type}
      {...input}
    />
)};

const renderCheckbox = ({ input, label }) => (
    <FormControlLabel
        control={<Checkbox value="remember" color="primary" 
        onCheck={input.onChange} />}
        label={label}
        onChange={input.onChange}
        checked={input.value ? true : false}
    />
);

const validate = values => {
    const errors = {};
    const requiredFields = [
     'email',
     'password'
    ];
    requiredFields.forEach(field => {
     if (!values[field]) {
       errors[field] = 'Required';
     }
    });
    if (
     values.email &&
     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
     errors.email = 'Invalid email address';
    }
    return errors;
 }

const SignInModal = ({ invalid, handleSubmit, submitting }) => {
    const [open, setOpen] = React.useState(true);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
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
                    <Avatar className='lock'>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className='sign-in-form' onSubmit={handleSubmit}>
                        <Grid className="grid" container spacing={0}>
                            <Grid className="grid-item" item xs={12} sm={12}>
                                <Field name="email" label="Email Address" component={renderTextField} type="email" />
                            </Grid>
                            <Grid className="grid-item" item xs={12} sm={12}>
                                <Field name="password" label="Password" component={renderTextField} type="password" />
                            </Grid>
                            <Grid className="remember" item xs={12} sm={12}>
                                <Field name="remember me" component={renderCheckbox} type="checkbox" label="Remember me" />
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
    )
}

export default reduxForm({
    form: 'SignIn',
    validate,
    onSubmit: (values) => console.log(values)
})(SignInModal);
