import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Avatar, Button, Drawer, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import './Drawer.scss';

const NavDrawer = ({ handleSignIn, handleSignUp, authenticated, profile }) => {
    const [state, setState] = React.useState({ left: false });
    const router = useRouter();
    const menuNames = authenticated ? ['Profile', 'Favorites'] : ['Login', 'Register'];

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [side]: open });
    };

    const handleClick = (text) => {
      if (text === 'login' || text === 'register') {

      } else {
        router.push(`/${text}`);
      }
    }

    const sideList = side => (
        <div
          className="list-container"
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <List>
            <ListItem>
              {authenticated && (
                <Avatar
                alt="Remy Sharp"
                src={profile.photoURL ? profile.photoURL : "/static/noImageFound.jpg"}
                className="avatar nav-avatar"
                />
              )}
            </ListItem>
            {authenticated ? (
              menuNames.map((text, index) => (
              <ListItem button key={index}>
                  <ListItemText onClick={() => handleClick(text.toLowerCase())}  primary={text} />
              </ListItem>
            ))) : (
              menuNames.map((text, index) => (
                <ListItem button key={index}>
                    <ListItemText onClick={text === 'Login' ? handleSignIn : handleSignUp}  primary={text} />
                </ListItem>
            )))}
          </List>
          <Divider />
          <List>
            {['Upcoming', 'Popular', 'TopRated'].map((text, index) => (
              <ListItem button key={text}>
                    <ListItemText onClick={() => handleClick(text.toLowerCase())} primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
    );

    return (
        <div className="drawer">
            <Button className="drawer-btn" onClick={toggleDrawer('left', true)}>
                Menu
            </Button>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    )
}

export default NavDrawer;
