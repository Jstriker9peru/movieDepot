import React from 'react';
import { Button } from '@material-ui/core';

const SignedOutMenu = ({ handleSignIn, handleSignUp }) => {
    return (
        <React.Fragment>
            <Button onClick={handleSignIn}>Login</Button>
            <Button onClick={handleSignUp}>Register</Button>
        </React.Fragment>
    )
}

export default SignedOutMenu
