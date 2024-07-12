import React, { useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import Login from './Login';
import Signup from './Signup';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Container maxWidth="sm">
      {isLogin ? <Login /> : <Signup />}
      <Button onClick={toggleAuthMode} style={{ marginTop: '16px' }}>
        {isLogin ? 'Don\'t have an account? Sign Up' : 'Already have an account? Log In'}
      </Button>
    </Container>
  );
}

export default AuthPage;
