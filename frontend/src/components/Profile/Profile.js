import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useWallet } from '../../contexts/WalletContext';
import { connectWallet, getTokenBalance, mintTokens } from '../../services/wallet';
import { Container, Button, Typography, TextField } from '@mui/material';

function Profile() {
  const { currentUser, userData } = useAuth();
  const { walletAddress, setWalletAddress } = useWallet();
  const [error, setError] = useState('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const [mintAmount, setMintAmount] = useState('');

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
      fetchTokenBalance(walletAddress);
    } catch (e) {
      setError('Failed to mint tokens: ' + e.message);
    }
  };

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

  useEffect(() => {
    if (walletAddress) {
      fetchTokenBalance(walletAddress);
    }
  }, [mintAmount]);

  if (!userData) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>Profile</Typography>
        <Typography variant="body1">Loading user data...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      <Typography variant="body1"><strong>Username:</strong> {userData.username}</Typography>
      <Typography variant="body1"><strong>Email:</strong> {currentUser.email}</Typography>
      {walletAddress ? (
        <>
          <Typography variant="body1"><strong>Wallet Address:</strong> {walletAddress}</Typography>
          <Typography variant="body1"><strong>$VIBE Tokens Available:</strong> {tokenBalance}</Typography>
          <TextField
            label="Amount to Mint"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            type="number"
            variant="outlined"
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleMintTokens}>
            Mint Tokens
          </Button>
        </>
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
