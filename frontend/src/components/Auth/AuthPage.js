import React, { useState } from 'react';
import { Container, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import Login from './Login';
import Signup from './Signup';
import backgroundImage from '../../assets/images/background.png';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Center the content vertically
  minWidth: '100%',
  minHeight: '100vh',
  padding: '20px',
  backgroundColor: '#FDF5DF',
  backgroundImage: `url(${backgroundImage})`,
  backgroundBlendMode: 'difference',
});

const StyledButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#5EBEC4',
  color: '#000000',
  fontFamily: 'Archivo Black',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: 'transparent',
    color: '#F92C85',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  transition: 'all 0.3s ease',
});

const FormWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '400px',
});

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <StyledContainer>
      <FormWrapper>
        {isLogin ? <Login /> : <Signup />}
        <StyledButton onClick={toggleAuthMode}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
        </StyledButton>
      </FormWrapper>
    </StyledContainer>
  );
}

export default AuthPage;
