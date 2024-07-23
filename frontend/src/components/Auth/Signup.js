import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/auth';
import { useAuth } from '../../contexts/AuthContext';
import { Container, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';

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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
          style={{ marginTop: '16px' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
        </Button>
      </form>
    </Container>
  );
}

export default Signup;
