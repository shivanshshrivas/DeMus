const {Web3} = require('web3');
const dotenv = require('dotenv');
const { abi: musicRegistryAbi, networks: musicRegistryNetworks } = require('../../smart-contracts/build/contracts/RegisterMusic.json');
const { abi: vibeAbi, networks: vibeNetworks } = require('../../smart-contracts/build/contracts/Vibe.json');

dotenv.config({ path: '../../smart-contracts/.env' });

const ALCHEMY_API_URL = `https://polygon-amoy.g.alchemy.com/v2/7yGZ0COisSDN-0gXm80e6RQzBJAkjkEk`;
const web3 = new Web3(new Web3.providers.HttpProvider(ALCHEMY_API_URL));

const networkId = '80002'; // Assuming you're using Polygon Mumbai Testnet
const musicRegistryAddress = musicRegistryNetworks[networkId].address;
const vibeAddress = vibeNetworks[networkId].address;

const musicRegistry = new web3.eth.Contract(musicRegistryAbi, musicRegistryAddress);
const vibe = new web3.eth.Contract(vibeAbi, vibeAddress);

const prepareTransactionData = async (title, artist, ipfsHash, fingerprint, account) => {
  try {
    const txData = musicRegistry.methods.registerTrack(title, artist, ipfsHash, fingerprint, account).encodeABI();
    return { txData, contractAddress: musicRegistryAddress };
  } catch (error) {
    console.error('Error preparing transaction data:', error);
    throw new Error('Error preparing transaction data');
  }
};

const getTrack = async (fingerprint) => {
  try {
    const track = await musicRegistry.methods.getTrack(fingerprint).call();
    if (!track.title) {
      return null; // No track found with this fingerprint
    }
    return {
      title: track.title,
      artist: track.artist,
      ipfsHash: track.ipfsHash,
      publicAddress: track.account,
      fingerprint: fingerprint
    };
  } catch (error) {
    console.error('Error getting track:', error);
    return null;
  }
};

const getAllTracks = async () => {
  try {
    const tracks = await musicRegistry.methods.getAllTracks().call();
    return tracks.map(track => ({
      title: track.title,
      artist: track.artist,
      ipfsHash: track.ipfsHash,
      publicAddress: track.account,
      fingerprint: track.fingerprint
    }));
  } catch (error) {
    console.error('Error fetching all tracks:', error);
    throw new Error('Error fetching all tracks');
  }
};

const searchTracks = async (query) => {
  try {
    const tracks = await musicRegistry.methods.searchTracks(query).call();
    return tracks.map(track => ({
      title: track.title,
      artist: track.artist,
      ipfsHash: track.ipfsHash,
      publicAddress: track.account,
      fingerprint: track.fingerprint
    }));
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw new Error('Error searching tracks');
  }
};

const tipArtist = async (fromAddress, toAddress, amount) => {
  try {
    const txHash = await web3.eth.sendTransaction({
      from: fromAddress,
      to: toAddress,
      value: web3.utils.toWei(amount, 'ether')
    });
    return txHash;
  } catch (error) {
    console.error('Error tipping artist:', error);
    throw new Error('Error tipping artist');
  }
};

module.exports = { prepareTransactionData, getTrack, getAllTracks, searchTracks, tipArtist };
