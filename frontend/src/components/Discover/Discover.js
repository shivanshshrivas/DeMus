import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import MusicCard from './MusicCard';

function Discover() {
  // Mock data for example
  const musicData = [
    { title: 'Song 1', artist: 'Artist 1' },
    { title: 'Song 2', artist: 'Artist 2' },
    { title: 'Song 3', artist: 'Artist 3' },
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Discover Music
      </Typography>
      <Grid container spacing={4}>
        {musicData.map((music, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <MusicCard title={music.title} artist={music.artist} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Discover;
