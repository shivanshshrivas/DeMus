import React, { useEffect, useState } from 'react';
import { getAllTracks } from '../../services/api';
import MusicCard from './MusicCard';
import SearchBar from './SearchBar';
import { Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import backgroundImage from '../../assets/images/background.png';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '100%',
  padding: '20px',
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
    <StyledContainer>
      <StyledHeading variant="h4" gutterBottom>
        Discover Music
      </StyledHeading>
      <SearchBar onSearch={handleSearch} />
      <Grid container spacing={3}>
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <Grid item xs={12} sm={6} md={3} key={track.fingerprint}> {/* Changed md={4} to md={3} */}
              <MusicCard track={track} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No tracks found</Typography>
        )}
      </Grid>
    </StyledContainer>
  );
};

export default Discover;
