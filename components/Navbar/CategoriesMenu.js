import React, { useState } from "react";
import MenuLink from "./MenuLink";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

const CategoriesMenu = ({ linkNames }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className="category-menu">
      <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        Categories
        <i className="material-icons">arrow_drop_down</i>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {linkNames &&
          linkNames.map((linkName, index) => {
            return (
              <MenuLink
                key={index}
                title={linkName}
                linkName={linkName}
                handleClose={handleClose}
                isButton={false}
              />
            );
          })}
      </Menu>
    </div>
  );
};

export default CategoriesMenu;
