import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledTextField = styled(TextField)({
  marginRight: '10px',
  flexGrow: 1,
});

const StyledButton = styled(Button)({
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

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" mb={3}>
      <StyledTextField
        label="Search by Artist or Song"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <StyledButton type="submit" variant="contained">
        Search
      </StyledButton>
    </Box>
  );
};

export default SearchBar;
