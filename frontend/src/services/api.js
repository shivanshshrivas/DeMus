import axios from 'axios';

const API_URL = 'https://demus-backend-c00643679c42.herokuapp.com/api';

export const uploadTrack = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading track:', error);
    throw error;
  }
};

export const getAllTracks = async (searchQuery = '') => {
  try {
    const response = await axios.get(`${API_URL}/tracks`, { params: { search: searchQuery } });
    return response.data.tracks;
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return [];
  }
};

export const getTrack = async (fingerprint) => {
  try {
    const response = await axios.get(`${API_URL}/track/${fingerprint}`);
    return response.data.track;
  } catch (error) {
    console.error('Error fetching track:', error);
    return null;
  }
};

export const getUserTracks = async (address) => {
  try {
    const response = await axios.get(`${API_URL}/user-tracks/${address}`);
    return response.data.tracks;
  } catch (error) {
    console.error('Error fetching user tracks:', error);
    return [];
  }
};

export const tipArtist = async (fromAddress, toAddress, amount) => {
  try {
    const response = await axios.post(`${API_URL}/tip`, { fromAddress, toAddress, amount });
    return response.data;
  } catch (error) {
    console.error('Error sending tip:', error);
    throw error;
  }
};
