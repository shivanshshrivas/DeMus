import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import MusicCard from '../Discover/MusicCard';
import { getUserTracks } from '../../services/api';
import { connectWallet } from '../../services/wallet';

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
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        My Music
      </Typography>
      <Grid container spacing={3}>
        {tracks.map((track, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <MusicCard track={track} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MyMusic;
