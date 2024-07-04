import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Profile() {
  // Mock user data for example
  const userData = {
    username: 'user123',
    email: 'user123@example.com',
    wallet: '0x1234567890abcdef',
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>
      <Box mt={3}>
        <Typography variant="h6">Username: {userData.username}</Typography>
        <Typography variant="h6">Email: {userData.email}</Typography>
        <Typography variant="h6">Wallet: {userData.wallet}</Typography>
      </Box>
    </Container>
  );
}

export default Profile;
