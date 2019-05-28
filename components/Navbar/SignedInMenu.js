import React from 'react';
import { Button, Menu, MenuItem, Avatar } from '@material-ui/core';

const SignedInMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }
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
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default SignedInMenu
