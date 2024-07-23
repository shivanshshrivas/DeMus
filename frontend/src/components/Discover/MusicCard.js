import React from 'react';
import { Card, CardContent, Typography, CardActionArea, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

const MusicCard = ({ track }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/track/${track.fingerprint}`}>
        <CardMedia
          component="img"
          height="140"
          image={require('../../assets/images/music.png')}  // Static image
          alt={track.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {track.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {track.artist}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MusicCard;
