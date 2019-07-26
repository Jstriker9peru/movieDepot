import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const Notification = ({ message, isOpen, setOpen }) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    return (
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            ContentProps={{
            'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
            action={[
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon />
            </IconButton>
            ]}
        />
    )
}

export default Notification;
