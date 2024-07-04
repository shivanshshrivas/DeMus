import React from 'react';
import Typography from '@mui/material/Typography';
import { Container, Box } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Container maxWidth="lg">
        <Typography variant="body1">
          DeMus - Decentralized Music Platform
        </Typography>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} DeMus. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
