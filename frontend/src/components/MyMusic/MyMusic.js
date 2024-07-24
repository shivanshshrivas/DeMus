import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import MusicCard from '../Discover/MusicCard';
import { getUserTracks } from '../../services/api';
import { connectWallet } from '../../services/wallet';
import { styled } from '@mui/system';
import backgroundImage from '../../assets/images/background.png';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  minWidth: '100%',
  backgroundColor: '#FDF5DF',
  minHeight: '95vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundBlendMode: 'difference',
});

const StyledHeading = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '3.75rem',
  marginTop: '20px',
  color: '#F92C85',
  fontFamily: 'Sans-Serif',
});

const MyMusic = () => {
  const [tracks, setTracks] = useState([]);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      const connectedAccount = await connectWallet();
      setAccount(connectedAccount);
      const userTracks = await getUserTracks(connectedAccount);
      setTracks(userTracks);
    };

    fetchTracks();
  }, []);

  return (
    <StyledContainer>
      <StyledHeading variant="h4" component="div" gutterBottom>
        My Music
      </StyledHeading>
      <Grid container spacing={3}>
        {tracks.map((track, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <MusicCard track={track} />
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
};

export default MyMusic;
