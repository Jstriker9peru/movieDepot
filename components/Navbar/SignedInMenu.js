import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { withFirebase } from "react-redux-firebase";
import { logOut } from "../../modules/actions/authActions";
import { Button, Menu, MenuItem, Avatar } from "@material-ui/core";
import MenuLink from "./MenuLink";

const SignedInMenu = ({ firebase, logOut, router, profile }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const signOut = () => {
    setAnchorEl(null);
    logOut();
    firebase.logout();
    router.push("/");
  };
  return (
    <React.Fragment>
      <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar
          alt="Remy Sharp"
          src={profile.photoURL ? profile.photoURL : "/static/noImageFound.jpg"}
          className="avatar nav-avatar"
        />
        <i className="material-icons">arrow_drop_down</i>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuLink
          linkName="profile"
          title="Profile"
          handleClose={handleClose}
          isButton={false}
        />
        <MenuLink
          linkName={"favorites"}
          title="My Favorites"
          handleClose={handleClose}
          isButton={false}
        />
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = {
  logOut
};

export default compose(
  withFirebase,
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignedInMenu);
