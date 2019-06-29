import React from 'react';
import { Button, Link, MenuItem } from '@material-ui/core';

const MenuLink = ({ linkName, handleClose, isButton }) => {
    return (
        <Link href={`/${linkName}`}>
            {isButton ? (
                <Button>
                    {linkName}
                </Button>
            ) : (
                <MenuItem onClick={handleClose}>{linkName}</MenuItem>
            )}
        </Link>
    )
}

export default MenuLink
