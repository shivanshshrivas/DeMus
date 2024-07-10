import detectEthereumProvider from '@metamask/detect-provider';

export async function connectWallet() {
    const provider = await detectEthereumProvider();
    if (provider) {
        try {
            await provider.request({ method: 'eth_requestAccounts' });
            return provider;
        } catch (error) {
            console.error('User denied account access');
            return null;
        }
    } else {
        console.error('Please install MetaMask!');
        return null;
    }
}