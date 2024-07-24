import React from 'react';
import { Container, Typography, Paper} from '@mui/material';
import { styled } from '@mui/system';
import UploadForm from './UploadForm';
import backgroundImage from '../../assets/images/background.png';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  minWidth: '100%',
  backgroundColor: '#FDF5DF',
  minHeight: '95vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundBlendMode: 'difference',
});

const StyledHeading = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '3.75rem',
  marginTop: '20px',
  color: '#F92C85',
  fontFamily: 'Sans-Serif',
});
const StyledPaper = styled(Paper)({
  padding: '20px',
  marginTop: '30px',
  border: '2px dashed #5EBEC4',
  borderRadius: '15px', // Increased border-radius
  width: '100%',
  maxWidth: '600px',
  textAlign: 'center',
  backgroundColor: 'inherit', // Use the default background color
  boxShadow: 'none', // Remove box shadow to eliminate white border
});

function Upload() {
  return (
    <StyledContainer>
      <StyledHeading variant="h4" component="h1" gutterBottom>
        Upload Music
      </StyledHeading>
      <StyledPaper>
        <UploadForm />
      </StyledPaper>
    </StyledContainer>
  );
}

export default Upload;
