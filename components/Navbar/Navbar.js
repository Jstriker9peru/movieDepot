import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { AppBar, Toolbar } from "@material-ui/core";
import { fetchUser } from "../../modules/actions/authActions";
import { openModal } from "../../modules/actions/modalActions";
import { getFavorites } from "../../modules/actions/favoritesActions";
import {
  firebaseConnect,
  withFirebase,
  withFirestore
} from "react-redux-firebase";
import Link from "next/link";
import SearchBar from "./SearchBar";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";
import CategoriesMenu from "./CategoriesMenu";
import SignInModal from "../SignIn/SignInModal";
import SignUpModal from "../SignUp/SignUpModal";
import "./Navbar.scss";

class Navbar extends Component {
  state = {
    linkNames: ["upcoming", "popular", "toprated", "test"]
  };

  handleSignIn = () => {
    this.props.openModal("SignInModal");
  };

  handleSignUp = () => {
    this.props.openModal("SignUpModal");
  };

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.props.fetchUser(this.props.firestore, user);
        this.props.getFavorites(this.props.firestore, this.props.firebase);
      }
    });
  }

  render() {
    const { linkNames } = this.state;
    const { currentModal, auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const nothing = null;
    return (
      <div className="navbar">
        {currentModal.modalType && currentModal.modalType == "SignInModal" ? (
          <SignInModal />
        ) : (
          nothing
        )}
        {currentModal.modalType && currentModal.modalType == "SignUpModal" ? (
          <SignUpModal />
        ) : (
          nothing
        )}
        <AppBar position="fixed" color="default">
          <Toolbar className="toolbar">
            <Link href="/">
              <a>
                <img
                  className="logo"
                  src="/static/logo.jpg"
                  alt="MovieDepot logo"
                />
              </a>
            </Link>
            <SearchBar />
            <div>
              <CategoriesMenu linkNames={linkNames} />
              {authenticated ? (
                <SignedInMenu />
              ) : (
                <SignedOutMenu
                  handleSignUp={this.handleSignUp}
                  handleSignIn={this.handleSignIn}
                />
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentModal: state.modal,
    auth: state.firebase.auth,
    authUser: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: type => {
      dispatch(openModal(type));
    },
    getFavorites: (firestore, firebase) => {
      dispatch(getFavorites({ firestore, firebase }));
    },
    fetchUser: (firestore, user) => {
      dispatch(fetchUser({ firestore }, user));
    }
  };
};

export default compose(
  firebaseConnect(),
  withFirebase,
  withFirestore,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Navbar);
