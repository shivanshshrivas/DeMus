import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useDropzone } from 'react-dropzone';
import { connectWallet, sendTransaction } from '../../services/wallet';

const UploadForm = () => {
  const { userData } = useAuth();
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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
      formData.append('file', file);
      formData.append('title', title);
      formData.append('artist', userData.username);
      formData.append('account', account);

      const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!uploadResponse.data.success) {
        if (uploadResponse.data.message === 'Track already exists') {
          alert('Similar track exists!');
          console.log(uploadResponse.data.track);
        } else {
          alert(uploadResponse.data.message);
        }
      } else {
        console.log(uploadResponse.data);

        // Generate the transaction parameters
        const txParams = {
          from: account,
          to: uploadResponse.data.contractAddress, // The contract address should be provided by the server
          data: uploadResponse.data.txData, // The data to be sent in the transaction
        };

        const txHash = await sendTransaction(txParams);
        console.log('Transaction sent with hash:', txHash);
        alert('Track uploaded and registered successfully!');
      }
    } catch (error) {
      console.error('Error uploading track:', error.response || error.message || error);
      alert('Error uploading track.');
    }

    setLoading(false);
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
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
    </Box>
  );
};

export default UploadForm;
