import React from 'react';
import { compose } from "redux";
import { connect } from 'react-redux';
import { logOut } from '../../modules/actions/authActions';
import { withRouter } from 'next/router';
import { Button, Menu, MenuItem, Avatar } from '@material-ui/core';
import { withFirebase } from 'react-redux-firebase';
import MenuLink from './MenuLink';

const SignedInMenu = ({ handleSignOut, firebase, history, logOut, router }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
    // function logOut() {
        //     // handleSignOut();
        // }
    const signOut = () => {
        setAnchorEl(null);
        logOut();
        firebase.logout();
        router.push('/');
        console.log('User logged out');
    };
    return (
        <React.Fragment>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <Avatar alt="Remy Sharp" src="/static/courage.jpg" className='avatar' />
                <i className="material-icons">
                 arrow_drop_down
                </i>
            </Button>
            <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose} linkName="favorites">My Favorites</MenuItem> */}
                <MenuLink linkName="profile" title="Profile" handleClose={handleClose} isButton={false} />
                <MenuLink linkName={"favorites"} title="My Favorites" handleClose={handleClose} isButton={false} />
                <MenuItem onClick={signOut}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

const mapDispatchToProps = {
    logOut
}

export default compose(
    withFirebase,
    withRouter,
    connect(null, mapDispatchToProps)
)(SignedInMenu);
