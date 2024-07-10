import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    backgroundImage: 'url(/path/to/your/background-image.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
  },
  heroButton: {
    marginTop: '20px',
  },
}));

function HeroSection() {
  const classes = useStyles();

  return (
    <Container className={classes.heroContainer}>
      <Typography variant="h2" component="h1" style={{color: 'black'}}>
        Empower Your Music Journey
      </Typography>
      <Typography variant="h5" component="p" style={{ marginTop: '20px', color:'gray'}}>
        Discover, Upload, and Get Recognized
      </Typography>
      <Button variant="contained" color="primary" className={classes.heroButton} onClick={handleGetStarted}>
        Get Started
      </Button>
    </Container>
  );
}

export default HeroSection;
