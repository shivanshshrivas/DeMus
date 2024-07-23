import React, { useEffect, useState } from 'react';
import { getAllTracks } from '../../services/api';
import MusicCard from './MusicCard';
import SearchBar from './SearchBar';
import { Container, Grid, Typography } from '@mui/material';

const Discover = () => {
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTracks = async () => {
      const allTracks = await getAllTracks();
      setTracks(allTracks);
    };

    fetchTracks();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    const allTracks = await getAllTracks(query);
    setTracks(allTracks);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Discover Music
      </Typography>
      <SearchBar onSearch={handleSearch} />
      <Grid container spacing={3}>
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <Grid item xs={12} sm={6} md={4} key={track.fingerprint}>
              <MusicCard track={track} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No tracks found</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Discover;
