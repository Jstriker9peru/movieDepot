import React from 'react';
import { Button, Link } from '@material-ui/core';

const MenuLink = ({ linkName }) => {
    return (
        <Link href={`/${linkName}`}>
            <Button>
                {linkName}
            </Button>
        </Link>
    )
}

export default MenuLink
