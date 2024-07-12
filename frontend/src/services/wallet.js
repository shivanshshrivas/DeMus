import detectEthereumProvider from '@metamask/detect-provider';

export async function connectWallet() {
  const provider = await detectEthereumProvider();

  if (provider) {
    try {
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      return accounts[0] // Ensure this returns a string
    } catch (error) {
      console.error('User rejected the request:', error);
      return null;
    }
  } else {
    console.error('Please install MetaMask!');
    return null;
  }
}
