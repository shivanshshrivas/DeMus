import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/auth';

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      console.log('Attempting to sign up...');
      await signup(emailRef.current.value, passwordRef.current.value);
      console.log('Signup successful');
      navigate('/');
    } catch (e) {
      console.error('Signup failed', e);
      setError('Failed to create an account: ' + e.message);
    }

    setLoading(false);
  }

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" ref={emailRef} required />
        <label>Password</label>
        <input type="password" ref={passwordRef} required />
        <label>Password Confirmation</label>
        <input type="password" ref={passwordConfirmRef} required />
        <button disabled={loading} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
