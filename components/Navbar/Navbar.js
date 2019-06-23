import React, { Component } from "react";
import { compose } from "redux";
import { connect } from 'react-redux';
import Link from 'next/link';
import { AppBar, Toolbar } from '@material-ui/core';
import { withFirebase } from 'react-redux-firebase';
import { openModal } from '../../modules/actions/modalActions';
import { fetchUser } from '../../modules/actions/authActions';
import MenuLink from './MenuLink';
import SignInModal from '../SignIn/SignInModal';
import SignUpModal from '../SignUp/SignUpModal';
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from './SignedInMenu';
import './Navbar.scss';

class Navbar extends Component {
  state = {
    linkNames: ['upcoming','popular','toprated', 'favorites', 'test'],
    // signedIn: false
  }

  handleSignIn = () => {
    this.props.openModal('SignInModal');
    console.log('Modal has opened');
  };

  handleSignUp = () => {
    this.props.openModal('SignUpModal')
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.props.fetchUser(user);
      }
    });
    console.log('This is the current user after mount', this.props.firebase.auth().currentUser);
  }

  render() {
    const { linkNames } = this.state;
    const { currentModal, auth, authUser, firebase } = this.props;
    const authenticated = authUser.authenticated;
    const nothing = null;
    console.log('This is current user', firebase.auth().currentUser);
    return (
      <div className="navbar">
        {currentModal.modalType && currentModal.modalType == 'SignInModal' ? (
          <SignInModal />
        ) : nothing}
        {currentModal.modalType && currentModal.modalType == 'SignUpModal' ? (
          <SignUpModal />
        ) : nothing}
        <AppBar position="fixed" color="default">
          <Toolbar className="toolbar">    
            <Link href="/">
              <a>
                <img className="logo" src="/static/logo.jpg" alt="MovieDepot logo" />
              </a>
            </Link>
            <div>
              {linkNames && linkNames.map((linkName, index) => <MenuLink key={index} linkName={linkName} /> )}
              {authenticated ?
              <SignedInMenu /> :
              <SignedOutMenu handleSignUp={this.handleSignUp} handleSignIn={this.handleSignIn} />}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentModal: state.modal,
    auth: state.firebase.auth,
    authUser: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (type) => {
      dispatch(openModal(type));
    },
    fetchUser: (user) => {
      dispatch(fetchUser(user));
    }
  }
}

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar);


