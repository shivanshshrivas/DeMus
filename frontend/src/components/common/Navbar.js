import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          DeMus
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/discover">Discover</Button>
        <Button color="inherit" component={Link} to="/upload">Upload</Button>
        <Button color="inherit" component={Link} to="/my-music">My Music</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

