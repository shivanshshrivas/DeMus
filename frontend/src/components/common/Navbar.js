import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          DeMus
        </Typography>
        {currentUser ? (
          <>
            <Button component={Link} to="/discover" color="inherit">Discover</Button>
            <Button component={Link} to="/upload" color="inherit">Upload</Button>
            <Button component={Link} to="/my-music" color="inherit">My Music</Button>
            <IconButton color="inherit" component={Link} to="/profile">
              <AccountCircle />
              <Typography variant="body1" style={{ marginLeft: '8px' }}>{currentUser.displayName || 'Profile'}</Typography>
            </IconButton>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button component={Link} to="/home" color="inherit">Home</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
