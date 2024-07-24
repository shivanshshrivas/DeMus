import React from 'react';
import { Card, CardContent, Typography, CardActionArea, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  backgroundColor: '#FDF5DF',
  border: '2px dashed #5EBEC4',
  borderRadius: '15px',
  padding: '10px',
  boxShadow: 'none',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: 310, // Adjust the image height
  width: 'auto',
});

const MusicCard = ({ track }) => {
  return (
    <StyledCard>
      <CardActionArea component={Link} to={`/track/${track.fingerprint}`}>
        <StyledCardMedia
          component="img"
          image={require('../../assets/images/record.png')}  // Static image
          alt={track.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {track.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            @{track.artist}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default MusicCard;
