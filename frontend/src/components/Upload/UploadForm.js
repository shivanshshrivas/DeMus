import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

function UploadForm() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UploadForm;
