import React from 'react';
import { Container, Typography } from '@mui/material';
import UploadForm from './UploadForm';

function Upload() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Upload Music
      </Typography>
      <UploadForm />
    </Container>
  );
}

export default Upload;
