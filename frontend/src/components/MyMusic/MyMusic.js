import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

function MyMusic() {
  // Mock data for example
  const myMusicData = [
    { title: 'My Song 1', artist: 'Me' },
    { title: 'My Song 2', artist: 'Me' },
    { title: 'My Song 3', artist: 'Me' },
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        My Music
      </Typography>
      <List>
        {myMusicData.map((music, index) => (
          <ListItem key={index}>
            <ListItemText primary={music.title} secondary={music.artist} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default MyMusic;
