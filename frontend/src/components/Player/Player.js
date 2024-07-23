import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTrack } from '../../services/api';
import { Card, CardContent, Typography, Button, LinearProgress, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { connectWallet, tipArtist } from '../../services/wallet';

const Player = () => {
  const { fingerprint } = useParams();
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [progress, setProgress] = useState(0);
  const [tipOpen, setTipOpen] = useState(false);
  const [tipAmount, setTipAmount] = useState('');

  useEffect(() => {
    const fetchTrack = async () => {
      const trackData = await getTrack(fingerprint);
      setTrack(trackData);
      const audio = new Audio(`https://gateway.pinata.cloud/ipfs/${trackData.ipfsHash}`);
      setAudio(audio);

      audio.addEventListener('timeupdate', updateProgress);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    };

    fetchTrack();
  }, [fingerprint]);

  const updateProgress = () => {
    if (audio) {
      const progress = (audio.currentTime / audio.duration) * 100;
      setProgress(progress);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTip = async () => {
    try {
      const fromAddress = await connectWallet();
      const txHash = await tipArtist(fromAddress, track.publicAddress, tipAmount);
      console.log('Transaction Hash:', txHash);
      setTipOpen(false);
    } catch (error) {
      console.error('Error sending tip:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {track ? track.title : 'Loading...'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {track ? track.artist : 'Loading...'}
        </Typography>
        <Button onClick={handlePlayPause} variant="contained" startIcon={isPlaying ? <PauseIcon /> : <PlayArrowIcon />}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setTipOpen(true)}>TIP</Button>
      </CardContent>

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
    </Card>
  );
};

export default Player;
