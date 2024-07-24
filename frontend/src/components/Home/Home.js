import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../../assets/images/background.png';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '100%',
  minHeight: '100vh',
  padding: '20px',
  backgroundColor: '#FDF5DF',
  backgroundImage: `url(${backgroundImage})`,
  backgroundBlendMode: 'difference',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginTop: '30px',
  border: '2px dashed #5EBEC4',
  borderRadius: '15px',
  backgroundColor: 'inherit',
  boxShadow: 'none',
  textAlign: 'center',
  maxWidth: '600px',
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

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <StyledContainer>
      <StyledHeading variant="h2" gutterBottom>Welcome to DeMus</StyledHeading>
      <StyledPaper>
        <Typography variant="h6" gutterBottom>
          DeMus is a decentralized music platform that empowers artists and listeners alike. Discover new music, upload your tracks, and support your favorite artists directly with no intermediaries. Join us in revolutionizing the music industry!
        </Typography>
        <StyledButton variant="contained" onClick={handleGetStarted}>
          Get Started
        </StyledButton>
      </StyledPaper>
    </StyledContainer>
  );
}

export default Home;
