import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

function MusicCard({ title, artist }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {artist}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default MusicCard;
