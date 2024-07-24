import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/auth';
import { useAuth } from '../../contexts/AuthContext';
import { Container, TextField, Button, Typography, Alert, CircularProgress, Paper } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../../assets/images/background.png';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '100%',
  maxHeight: '80vh',
  padding: '20px',
  backgroundColor: 'transparent',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginTop: '30px',
  border: '2px dashed #5EBEC4',
  borderRadius: '15px',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
  backgroundColor: '#FDF5DF',
  boxShadow: 'none',
});

const StyledHeading = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '3.75rem',
  color: '#F92C85',
  fontFamily: 'Sans-Serif',
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

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      navigate('/profile');
    }
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value);
    } catch (e) {
      setError('Failed to create an account: ' + e.message);
    }

    setLoading(false);
  }

  return (
    <StyledContainer>
      <StyledHeading>Sign Up</StyledHeading>
      <StyledPaper>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            inputRef={usernameRef}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            inputRef={emailRef}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            inputRef={passwordRef}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password Confirmation"
            type="password"
            inputRef={passwordConfirmRef}
            fullWidth
            required
            margin="normal"
          />
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </StyledButton>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
}

export default Signup;
