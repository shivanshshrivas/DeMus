import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import { connectWallet, getTokenBalance, mintTokens } from '../../services/wallet';
import { Container, Button, Typography, TextField, Paper, CircularProgress, Box, Backdrop } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../../assets/images/background.png';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  alignItems: 'center',
  minWidth: '100%',
  backgroundColor: '#FDF5DF',
  minHeight: '95vh',
  backgroundImage:`url(${backgroundImage})`,
  backgroundBlendMode: 'difference',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginTop: '30px',
  border: '2px dashed #5EBEC4',
  borderRadius: '15px', // Increased border-radius
  width: '100%',
  maxWidth: '600px',
  textAlign: 'center',
  backgroundColor: 'inherit', // Use the default background color
  boxShadow: 'none', // Remove box shadow to eliminate white border
});

const StyledHeading = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '3.75rem', // Reduced font size
  marginTop: '40px',
  color: '#F92C85',
  fontFamily: 'Sans-Serif', // Apply the Archivo Black font
});

const StyledInfo = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '2.25rem', // Reduced font size
  marginBottom: '10px',
  color: '#F92C85',
  fontFamily: 'Sans-Serif', // Apply the Archivo Black font
});

const BodyText = styled(Typography)({
  fontSize: '1.25rem', // Reduced font size
  color: '#000000',
  fontFamily: 'Sans-serif', // Apply the Poppins font
});

const StyledButton = styled(Button)({
  marginTop: '10px',
  backgroundColor: '#5EBEC4',
  color: '#000000',
  fontFamily: 'Archivo Black', // Apply the Archivo Black font
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: 'transparent', // Make it transparent on hover
    color: '#F92C85',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Add a slight shadow
    transition: 'all 0.3s ease',
  },
  transition: 'all 0.3s ease',
});

const Overlay = styled(Backdrop)({
  zIndex: 1000,
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(10px)', // Apply blur effect
});

const TimerText = styled(Typography)({
  color: '#FFEB3B',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginTop: '20px',
});

function Profile() {
  const { currentUser, userData } = useAuth();
  const { walletAddress, setWalletAddress } = useWallet();
  const [error, setError] = useState('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [overlay, setOverlay] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);
      fetchTokenBalance(address);
    } catch (e) {
      setError('Failed to connect wallet: ' + e.message);
    }
  };

  const fetchTokenBalance = async (address) => {
    try {
      const balance = await getTokenBalance(address);
      setTokenBalance(balance);
    } catch (e) {
      setError('Failed to fetch token balance: ' + e.message);
    }
  };

  const handleMintTokens = async () => {
    try {
      await mintTokens(walletAddress, mintAmount);
      setMintAmount(''); // Clear the mint amount input after minting
      setOverlay(true);
      setCooldown(true);
      setSecondsLeft(15); // Reset the timer
    } catch (e) {
      setErrorMessage('Oops! There was an error!');
      setOverlay(true);
      setCooldown(true);
      setSecondsLeft(30); // Set the error timer
    }
  };

  useEffect(() => {
    if (cooldown) {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setCooldown(false);
            setOverlay(false);
            setErrorMessage('');
            fetchTokenBalance(walletAddress);
            return 15; // Reset the timer
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cooldown, walletAddress]);

  useEffect(() => {
    if (currentUser) {
      console.log('Current User:', currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (walletAddress) {
      fetchTokenBalance(walletAddress);
    }
  }, [walletAddress]);

  if (!userData) {
    return (
      <StyledContainer>
        <StyledHeading variant="h4" gutterBottom>Profile</StyledHeading>
        <Typography variant="body1">Loading user data...</Typography>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      {/* <StyledHeading variant="h4" gutterBottom>Profile</StyledHeading> */}
      <StyledPaper>
        <StyledInfo variant="h6">Profile Info</StyledInfo>
        <BodyText variant="body1"><strong>Username:</strong> {userData.username}</BodyText>
        <BodyText variant="body1"><strong>Email:</strong> {currentUser.email}</BodyText>
      </StyledPaper>
      <StyledPaper>
        
        <StyledInfo variant="h6">Wallet Info</StyledInfo>
        {walletAddress ? (
          <>
            <BodyText variant="body1"><strong>Wallet Address:</strong> {walletAddress}</BodyText>
            <BodyText variant="body1"><strong>$VIBE Tokens Available:</strong> {tokenBalance}</BodyText>
            <TextField
              label="Amount to Mint"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              type="number"
              variant="outlined"
              margin="normal"
              fullWidth
              disabled={cooldown} // Disable input during cooldown
            />
            <StyledButton variant="contained" onClick={handleMintTokens}>
              Mint Tokens
            </StyledButton>
          </>
        ) : (
          <StyledButton variant="contained" onClick={handleConnectWallet}>
            Connect Wallet
          </StyledButton>
        )}
        {error && <Typography variant="body1" color="error">{error}</Typography>}
      </StyledPaper>

      <Overlay open={overlay}>
        <Box display="flex" alignItems="center" flexDirection="column">
          <CircularProgress size={60} style={{ color: '#F92C85' }} />
          <Typography variant="h5" style={{ color: '#F92C85', marginTop: '20px', fontFamily: 'Archivo Black' }}>
            {errorMessage || '$VIBE tokens on the way!'}
          </Typography>
          <TimerText variant="h6">{secondsLeft} seconds</TimerText>
        </Box>
      </Overlay>
    </StyledContainer>
  );
}

export default Profile;
