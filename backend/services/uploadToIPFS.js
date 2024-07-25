const axios = require('axios');
const fs = require('fs-extra');
const FormData = require('form-data');
const dotenv = require('dotenv');

dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.PINATA_SECRET_API_KEY;

async function uploadToIPFS(filePath) {
  try {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: `${PINATA_API_KEY}`,
        pinata_secret_api_key: `${PINATA_SECRET_API_KEY}`,
      }
    });

    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload file to IPFS');
  }
}

module.exports = { uploadToIPFS };
