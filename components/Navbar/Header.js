import React, { Component } from "react";
import Link from 'next/link';
import "../../styles.scss";
import { AppBar, Toolbar } from '@material-ui/core';
import MenuLink from './MenuLink';
import '../../styles.scss';
import SignOutMenu from "./SignOutMenu";
import SignInMenu from './SignInMenu';

class Header extends Component {
  state = {
    linkNames: ['profile', 'favorites']
  }
  render() {
    const { linkNames } = this.state;
    return (
      <div className="header">
        <AppBar position="fixed" color="default">
          <Toolbar className="toolbar">    
            <Link href="/">
              <a>
                <img className="logo" src="/static/logo.jpg" alt="MovieDepot logo" />
              </a>
            </Link>
            <div>
              {linkNames && linkNames.map((linkName, index) => <MenuLink key={index} linkName={linkName} /> )}
              {/* <SignOutMenu /> */}
              <SignInMenu />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

export default Header;


