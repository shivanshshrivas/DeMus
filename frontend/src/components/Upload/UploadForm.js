import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Box, Typography, Backdrop, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import { useAuth } from '../../contexts/AuthContext';
import { useDropzone } from 'react-dropzone';
import { connectWallet, sendTransaction } from '../../services/wallet';

const StyledButton = styled(Button)({
  marginTop: '10px',
  backgroundColor: '#5EB3C4',
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
  padding: '50px',
  border: '2px dashed #FFEB3B',
  borderRadius: '15px',
  backgroundColor: '#FFF9C4',
  textAlign: 'center',
  position: 'relative',
});

const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '10px',
  right: '10px',
});

const TimerText = styled(Typography)({
  color: '#FFEB3B',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  marginTop: '20px',
});

const UploadForm = () => {
  const { userData } = useAuth();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [showOverlay, setShowOverlay] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'audio/*' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const formData = new FormData();
      const account = await connectWallet();
      formData.append('track', file); // Change 'file' to 'track'
      formData.append('title', title);
      formData.append('artist', userData.username);
      formData.append('account', account);
  
      const uploadResponse = await axios.post('https://demus-backend-c00643679c42.herokuapp.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (!uploadResponse.data.success) {
        if (uploadResponse.data.message === 'Track already exists') {
          setOverlayMessage('Similar Track Already Exists');
          setShowOverlay(true);
        } else {
          handleError();
        }
      } else {
        const txParams = {
          from: account,
          to: uploadResponse.data.contractAddress,
          data: uploadResponse.data.txData,
        };
  
        const txHash = await sendTransaction(txParams);
        console.log('Transaction sent with hash:', txHash);
        setOverlayMessage('Yay, song uploaded successfully!');
        setShowOverlay(true);
      }
    } catch (error) {
      console.error('Error uploading track:', error.response || error.message || error);
      handleError();
    }
  
    setLoading(false);
  };

  const handleError = () => {
    setOverlayMessage('Oops! An error occurred! Try again in 30 seconds.');
    setLoading(false);
    setCooldown(true);
    setSecondsLeft(30);
    setShowOverlay(true);
  };

  useEffect(() => {
    if (cooldown) {
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setCooldown(false);
            setOverlayMessage('');
            setShowOverlay(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cooldown]);

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setOverlayMessage('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Box {...getRootProps({ className: 'dropzone' })} sx={{ border: '2px dashed gray', padding: 2, textAlign: 'center' }}>
        <input {...getInputProps()} />
        {file ? (
          <Typography>{file.name}</Typography>
        ) : (
          <Typography>Drag & drop a music file here, or click to select a file</Typography>
        )}
      </Box>
      <StyledButton type="submit" variant="contained" fullWidth disabled={loading || cooldown}>
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </StyledButton>

      <Overlay open={showOverlay}>
        <MessageBox>
          <CloseButton onClick={handleCloseOverlay}>
            <CloseIcon />
          </CloseButton>
          <Typography variant="h5" style={{ color: '#F92C85', fontFamily: 'Archivo Black' }}>
            {overlayMessage}
          </Typography>
          {overlayMessage === 'Oops! An error occurred! Try again in 30 seconds.' && (
            <TimerText variant="h6">{secondsLeft} seconds</TimerText>
          )}
        </MessageBox>
      </Overlay>
    </Box>
  );
};

export default UploadForm;
