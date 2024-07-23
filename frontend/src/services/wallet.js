import Web3 from 'web3';
import Vibe from '../build/contracts/Vibe.json';

const web3 = new Web3(Web3.givenProvider || 'https://polygon-amoy.g.alchemy.com/v2/7yGZ0COisSDN-0gXm80e6RQzBJAkjkEk');

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      throw new Error('User rejected the request.');
    }
  } else {
    throw new Error('No crypto wallet found. Please install it.');
  }
};

export const getTokenBalance = async (address) => {
  try {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Vibe.networks[networkId];
    const contract = new web3.eth.Contract(Vibe.abi, deployedNetwork && deployedNetwork.address);
    const balance = await contract.methods.balanceOf(address).call();
    return web3.utils.fromWei(balance, 'ether');
  } catch (error) {
    throw new Error('Failed to fetch token balance: ' + error.message);
  }
};

export const sendTransaction = async (txParams) => {
  if (window.ethereum) {
    try {
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txParams],
      });
      return txHash;
    } catch (error) {
      throw new Error('Transaction sending failed: ' + error.message);
    }
  } else {
    throw new Error('No crypto wallet found. Please install it.');
  }
};

export const mintTokens = async (address, amount) => {
  try {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Vibe.networks[networkId];
    const contract = new web3.eth.Contract(Vibe.abi, deployedNetwork && deployedNetwork.address);
    const amountToMint = web3.utils.toWei(amount, 'ether');

    const transactionParameters = {
      from: address,
      to: contract.options.address,
      data: contract.methods.mint(address, amountToMint).encodeABI(),
    };

    console.log('Transaction Parameters:', transactionParameters);

    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });

    console.log('Minting successful');
  } catch (error) {
    console.error('Minting Error:', error);
    throw new Error('Failed to mint tokens: ' + error.message);
  }
};

export const tipArtist = async (fromAddress, toAddress, amount) => {
  try {
    const transactionParameters = {
      from: fromAddress,
      to: toAddress,
      value: web3.utils.toWei(amount, 'ether'),
    };

    const txHash = await sendTransaction(transactionParameters);
    return txHash;
  } catch (error) {
    throw new Error('Failed to send tip: ' + error.message);
  }
};