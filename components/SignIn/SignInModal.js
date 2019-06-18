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
import './SignInModal.scss';

const SignInModal = () => {
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
                <form className='sign-in-form' noValidate>
                    <Grid className="grid" container spacing={2}>
                        <Grid className="grid-item" item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                        </Grid>
                        <Grid className="grid-item" item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid className="remember" item xs={12} sm={12}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                        <Grid className="grid-item" item xs={12} sm={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit-btn"
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid className="grid-item" item>
                            <Link href="#" variant="body2">
                                {"Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>   
            </div>
        </div>
      </Modal>
    )
}

export default SignInModal;
