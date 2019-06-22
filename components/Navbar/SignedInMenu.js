import React from 'react';
// import { compose } from "redux";
// import { connect } from 'react-redux';
import { Button, Menu, MenuItem, Avatar } from '@material-ui/core';
import { withFirebase } from 'react-redux-firebase';

const SignedInMenu = ({ handleSignOut }) => {
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
    const logOut = () => {
        setAnchorEl(null);
        this.props.firebase.logout();
        this.props.history.push('/');
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default withFirebase(SignedInMenu);
