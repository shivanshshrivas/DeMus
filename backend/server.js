const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { prepareTransactionData, getTrack, getAllTracks, searchTracks, tipArtist } = require('./services/blockchain');
const { uploadToIPFS } = require('./services/uploadToIPFS');
const generateFingerprint = require('./services/generateFingerprint');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// const index = {
//   titleToFingerprints: {},
//   artistToFingerprints: {}
// };

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { title, artist, account } = req.body;
  const filePath = req.file.path;

  try {
    const fingerprint = await generateFingerprint(filePath);

    const existingTrack = await getTrack(fingerprint);
    if (existingTrack) {
      console.log('Track already exists:', existingTrack);
      return res.json({ success: false, message: 'Track already exists', track: existingTrack });
    }

    const ipfsHash = await uploadToIPFS(filePath);
    console.log('Uploaded to IPFS:', ipfsHash);

    const { txData, contractAddress } = await prepareTransactionData(title, artist, ipfsHash, fingerprint, account);
    console.log('Transaction data prepared:', txData);

    // if (!index.titleToFingerprints[title]) {
    //   index.titleToFingerprints[title] = [];
    // }
    // if (!index.artistToFingerprints[artist]) {
    //   index.artistToFingerprints[artist] = [];
    // }
    // index.titleToFingerprints[title].push(fingerprint);
    // index.artistToFingerprints[artist].push(fingerprint);

    res.json({ success: true, txData, contractAddress });
    await fs.remove(filePath);
  } catch (error) {
    console.error('Error uploading track:', error);
    res.status(500).json({ success: false, message: 'Error uploading track' });
  }
});

app.get('/api/tracks', async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    let tracks;
    if (searchQuery) {
      tracks = await searchTracks(searchQuery);
    } else {
      tracks = await getAllTracks();
    }
    res.json({ success: true, tracks });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ success: false, message: 'Error fetching tracks.' });
  }
});

app.get('/api/track/:fingerprint', async (req, res) => {
  try {
    const { fingerprint } = req.params;
    const track = await getTrack(fingerprint);
    res.json({ success: true, track });
  } catch (error) {
    console.error('Error fetching track:', error);
    res.status(500).json({ success: false, message: 'Error fetching track.' });
  }
});

app.get('/api/user-tracks/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const tracks = await getAllTracks();
    const userTracks = tracks.filter(track => track.publicAddress.toLowerCase() === address.toLowerCase());
    res.json({ success: true, tracks: userTracks });
  } catch (error) {
    console.error('Error fetching user tracks:', error);
    res.status(500).json({ success: false, message: 'Error fetching user tracks.' });
  }
});

app.post('/api/tip', async (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;
  try {
    const txHash = await tipArtist(fromAddress, toAddress, amount);
    res.json({ success: true, txHash });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send tip' });
  }
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
