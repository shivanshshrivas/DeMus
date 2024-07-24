import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, IconButton, Paper } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  padding: '4px',
  backgroundColor: 'inherit',
  border: '2px dashed #5EBEC4',
  borderRadius: '15px',
  boxShadow: 'none',
});

const StyledButton = styled(Button)({
  fontWeight: 'bold',
});

const LogoutButton = styled(Button)({
  backgroundColor: '#F92C85',
  color: '#FFEB3B',
  border: '2px dashed #FFEB3B',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#F92C85',
    color: '#FFEB3B',
  },
  marginLeft: '10px',
});

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { walletAddress } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
          DeMus
        </Typography>
        {currentUser ? (
          <>
            {walletAddress && (
              <>
                <StyledPaper component={Link} to="/discover" elevation={0} style={{ backgroundColor: isCurrentPath('/discover') ? '#FFF9C4' : 'inherit' }}>
                  <StyledButton color="inherit">Discover</StyledButton>
                </StyledPaper>
                <StyledPaper component={Link} to="/upload" elevation={0} style={{ backgroundColor: isCurrentPath('/upload') ? '#FFF9C4' : 'inherit' }}>
                  <StyledButton color="inherit">Upload</StyledButton>
                </StyledPaper>
                <StyledPaper component={Link} to="/my-music" elevation={0} style={{ backgroundColor: isCurrentPath('/my-music') ? '#FFF9C4' : 'inherit' }}>
                  <StyledButton color="inherit">My Music</StyledButton>
                </StyledPaper>
              </>
            )}
            <IconButton color="inherit" component={Link} to="/profile" style={{ borderRadius: '15px', backgroundColor: isCurrentPath('/profile') ? '#FFF9C4' : 'inherit', border: isCurrentPath('/profile') ? '2px dashed #5EBEC4' : 'none' }}>
              <AccountCircle />
              <Typography variant="body1" style={{ marginLeft: '8px', fontWeight: 'bold' }}>Profile</Typography>
            </IconButton>
            <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
          </>
        ) : (
          <StyledButton component={Link} to="/auth" color="inherit">Login</StyledButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
