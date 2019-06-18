import React, { Component } from "react";
import Link from 'next/link';
import { AppBar, Toolbar } from '@material-ui/core';
import MenuLink from './MenuLink';
// import '../../scss/styles.scss';
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from './SignedInMenu';
import './Navbar.scss';

class Navbar extends Component {
  state = {
    linkNames: ['upcoming','popular','toprated', 'favorites', 'test'],
    signedIn: true
  }
  render() {
    const { linkNames, signedIn } = this.state;
    return (
      <div className="navbar">
        <AppBar position="fixed" color="default">
          <Toolbar className="toolbar">    
            <Link href="/">
              <a>
                <img className="logo" src="/static/logo.jpg" alt="MovieDepot logo" />
              </a>
            </Link>
            <div>
              {linkNames && linkNames.map((linkName, index) => <MenuLink key={index} linkName={linkName} /> )}
              {signedIn ?
              <SignedInMenu /> :
              <SignedOutMenu />}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default Navbar;


