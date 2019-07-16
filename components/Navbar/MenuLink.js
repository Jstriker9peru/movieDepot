import React from "react";
import { Button, Link, MenuItem } from "@material-ui/core";

const MenuLink = ({ linkName, handleClose, isButton, title }) => {
  return (
    <Link href={`/${linkName}`}>
      {isButton ? (
        <Button>{linkName}</Button>
      ) : (
        <MenuItem onClick={handleClose}>{title}</MenuItem>
      )}
    </Link>
  );
};

export default MenuLink;
