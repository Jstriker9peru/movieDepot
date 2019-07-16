import React, { Component } from "react";
import { compose } from "redux";
import { connect } from 'react-redux';
import Link from 'next/link';
import { AppBar, Toolbar, Input, TextField, InputAdornment } from '@material-ui/core';
import { firebaseConnect, firestoreConnect, withFirebase, withFirestore } from 'react-redux-firebase';
import { openModal } from '../../modules/actions/modalActions';
import { fetchUser } from '../../modules/actions/authActions';
import { getFavorites } from "../../modules/actions/favoritesActions";
import MenuLink from './MenuLink';
import SearchBar from "./SearchBar";
import SignInModal from '../SignIn/SignInModal';
import SignUpModal from '../SignUp/SignUpModal';
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from './SignedInMenu';
import CategoriesMenu from "./CategoriesMenu";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import './Navbar.scss';

class Navbar extends Component {
  state = {
    linkNames: ['upcoming','popular','toprated', 'test'],
    // searchTerm: '',
    // searchResults: []
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
        this.props.fetchUser(this.props.firestore, user);
        // console.log('Hello chicken');
        this.props.getFavorites(this.props.firestore, this.props.firebase);
      }
    });
  }

  componentWillUnmount() {
    console.log('Navbar unmounting');
  }

  render() {
    const { linkNames, searchTerm, searchResults } = this.state;
    const { currentModal, auth, firebase } = this.props;
    // const authenticated = authUser.authenticated;
    const authenticated = auth.isLoaded && !auth.isEmpty;
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
            <SearchBar />
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
    fetchUser: (firestore, user) => {
      dispatch(fetchUser({ firestore }, user));
    }
  }
}

export default compose(
  firebaseConnect(),
  withFirebase,
  withFirestore,
  connect(mapStateToProps, mapDispatchToProps),
)(Navbar);


