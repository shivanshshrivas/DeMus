import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';
import { Container, TextField, Button, Typography, Alert } from '@mui/material';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/profile');
    } catch (e) {
      setError('Failed to log in: ' + e.message);
    }

    setLoading(false);
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Log In</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Log In
        </Button>
      </form>
    </Container>
  );
}

export default Login;
