import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import { connectWallet } from '../../services/wallet';
import { Container, Button, Typography } from '@mui/material';

function Profile() {
  const { currentUser } = useAuth();
  const { walletAddress, setWalletAddress } = useWallet();
  const [error, setError] = useState('');

  const handleConnectWallet = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);
    } catch (e) {
      setError('Failed to connect wallet: ' + e.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Typography variant="body1"><strong>Username:</strong> {currentUser.username}</Typography>
      <Typography variant="body1"><strong>Email:</strong> {currentUser.email}</Typography>
      {walletAddress ? (
        <Typography variant="body1"><strong>Wallet Address:</strong> {walletAddress}</Typography>
      ) : (
        <Button variant="contained" color="primary" onClick={handleConnectWallet}>
          Connect Wallet
        </Button>
      )}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
    </Container>
  );
}

export default Profile;
