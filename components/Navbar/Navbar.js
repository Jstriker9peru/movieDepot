import React, { Component } from "react";
import { compose } from "redux";
import { connect } from 'react-redux';
import Link from 'next/link';
import { AppBar, Toolbar, Input, TextField, InputAdornment } from '@material-ui/core';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { openModal } from '../../modules/actions/modalActions';
import { fetchUser } from '../../modules/actions/authActions';
import { getFavorites } from "../../modules/actions/favoritesActions";
import MenuLink from './MenuLink';
import SignInModal from '../SignIn/SignInModal';
import SignUpModal from '../SignUp/SignUpModal';
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from './SignedInMenu';
import CategoriesMenu from "./CategoriesMenu";
import './Navbar.scss';

class Navbar extends Component {
  state = {
    linkNames: ['upcoming','popular','toprated', 'favorites', 'test'],
    searchTerm: ''
  }

  handleSignIn = () => {
    this.props.openModal('SignInModal');
    console.log('Modal has opened');
  };

  handleSignUp = () => {
    this.props.openModal('SignUpModal')
  }

  componentDidMount() {
    console.log('Nav firebase', this.props.firebase);
    console.log('Nav firestore', this.props.firestore);
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.props.fetchUser(user)
        console.log('Hello chicken');
        this.props.getFavorites(this.props.firestore, this.props.firebase);
      }
    });
  }

  componentWillUnmount() {
    console.log('Navbar unmounting');
  }

  render() {
    const { linkNames } = this.state;
    const { currentModal, auth, authUser, firebase } = this.props;
    const authenticated = authUser.authenticated;
    const nothing = null;
    console.log('This is current user 1234', firebase.auth().currentUser);
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
            <TextField
              id="outlined-search"
              label="Search a movie"
              type="search"
              margin="dense"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <i className="search-icon material-icons">
                      search
                    </i>
                  </InputAdornment>
                )
              }}
            />
            {/* <input placeholder="search" /> */}
            <div>
              <CategoriesMenu linkNames={linkNames} />
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
    getFavorites: (firestore, firebase) => {
      dispatch(getFavorites({ firestore, firebase }))
    },
    fetchUser: (user) => {
      dispatch(fetchUser(user));
    }
  }
}

export default compose(
  withFirebase,
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar);


