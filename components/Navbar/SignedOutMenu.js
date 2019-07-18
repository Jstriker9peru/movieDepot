import React from "react";
import { Button } from "@material-ui/core";
import './SignedOutMenu.scss';

const SignedOutMenu = ({ handleSignIn, handleSignUp }) => {
  return (
    <div className="sign-out-menu">
      <Button onClick={handleSignIn}>Login</Button>
      <Button onClick={handleSignUp}>Register</Button>
    </div>
  );
};

export default SignedOutMenu;
