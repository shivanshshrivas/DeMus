import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTrack } from '../../services/api';
import { Card, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress, Backdrop, Paper } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import CloseIcon from '@mui/icons-material/Close';
import { connectWallet, tipArtist } from '../../services/wallet';
import { styled } from '@mui/system';
import recordImage from '../../assets/images/record.png';
import backgroundImage from '../../assets/images/background.png';

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px',
  alignItems: 'center',
  minWidth: '95%',
  backgroundColor: '#FDF5DF',
  minHeight: '90vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundBlendMode: 'difference',
});

const StyledPaper = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: 'inherit',
  border: '2px dashed #5EBEC4',
  borderRadius: '15px',
  boxShadow: 'none',
  marginTop: '30px',
  width: '100%',
  maxWidth: '800px',
});

const ImageContainer = styled(Box)({
  width: '300px',
  height: '300px',
  marginRight: '50px',
  position: 'relative',
});

const RotatingImage = styled('img')({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  transition: 'transform 0.3s linear',
  '&.playing': {
    animation: 'spin 4s linear infinite',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
});

const InfoContainer = styled(Box)({
  flexGrow: 1,
});

const StyledButton = styled(Button)({
  marginTop: '10px',
  marginLeft: '25px',
  backgroundColor: '#5EBEC4',
  color: '#000000',
  fontFamily: 'Archivo Black',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: 'transparent',
    color: '#F92C85',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
  },
  transition: 'all 0.3s ease',
});

const StyledHeading = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '3.75rem',
  marginTop: '40px',
  color: '#F92C85',
  fontFamily: 'Sans-Serif',
});

const CircularButton = styled(IconButton)({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: '#5EB3C4',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#4AA1B2',
  },
  margin: '20px auto 0',
});

const Overlay = styled(Backdrop)({
  zIndex: 1000,
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(10px)',
});

const MessageBox = styled(Paper)({
  padding: '40px',
  border: '2px dashed #FFEB3B',
  borderRadius: '15px',
  backgroundColor: '#FFF9C4',
  textAlign: 'center',
  position: 'relative',
});

const TimerText = styled(Typography)({
  color: '#F92C85',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginTop: '20px',
});

const Player = () => {
  const { fingerprint } = useParams();
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [tipOpen, setTipOpen] = useState(false);
  const [tipAmount, setTipAmount] = useState('');
  const [overlay, setOverlay] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTrack = async () => {
      const trackData = await getTrack(fingerprint);
      setTrack(trackData);
      const audio = new Audio(`https://gateway.pinata.cloud/ipfs/${trackData.ipfsHash}`);
      setAudio(audio);

      audio.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    };

    fetchTrack();
  }, [fingerprint]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTip = async () => {
    setTipOpen(false);
    setOverlay(true);
    try {
      const fromAddress = await connectWallet();
      const txHash = await tipArtist(fromAddress, track.publicAddress, tipAmount);
      console.log('Transaction Hash:', txHash);
      setErrorMessage('');
      setCooldown(true);
      setSecondsLeft(10); // Reset the timer
    } catch (error) {
      console.error('Error sending tip:', error);
      setErrorMessage('There was an error tipping, try again in a few seconds');
    }
  };

  useEffect(() => {
    if (cooldown) {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setCooldown(false);
            setOverlay(false);
            setErrorMessage('');
            return 10; // Reset the timer
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cooldown]);

  return (
    <StyledContainer>
      <StyledHeading variant="h4" component="h1" gutterBottom>Song Info</StyledHeading>
      <StyledPaper>
        <ImageContainer>
          <RotatingImage
            src={recordImage}
            alt="Record"
            className={isPlaying ? 'playing' : ''}
          />
        </ImageContainer>
        <InfoContainer>
          <Typography variant="h6" gutterBottom>
            <b>Track Title: </b>{track ? track.title : 'Loading...'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            <b>Artist Username:</b> {track ? `@${track.artist}` : 'Loading...'}
          </Typography>
          <CircularButton onClick={handlePlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </CircularButton>
          <StyledButton variant="contained" sx={{ mt: 2 }} onClick={() => setTipOpen(true)}>TIP</StyledButton>
        </InfoContainer>

        <Dialog open={tipOpen} onClose={() => setTipOpen(false)}>
          <DialogTitle>Tip the Artist</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Tip Amount (Vibe Tokens)"
              type="number"
              fullWidth
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setTipOpen(false)}>Cancel</Button>
            <Button onClick={handleTip} variant="contained" color="primary">Tip</Button>
          </DialogActions>
        </Dialog>

        <Overlay open={overlay}>
          <MessageBox>
            <IconButton onClick={() => setOverlay(false)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
              <CloseIcon />
            </IconButton>
            {errorMessage ? (
              <>
                <Typography variant="h5" style={{ color: '#F92C85', fontFamily: 'Archivo Black' }}>
                  {errorMessage}
                </Typography>
              </>
            ) : (
              <>
                <CircularProgress size={60} style={{ color: '#F92C85' }} />
                <Typography variant="h5" style={{ color: '#F92C85', marginTop: '20px', fontFamily: 'Archivo Black' }}>
                  Tipping the artist
                </Typography>
                <TimerText variant="h6">{secondsLeft} seconds</TimerText>
              </>
            )}
          </MessageBox>
        </Overlay>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Player;
