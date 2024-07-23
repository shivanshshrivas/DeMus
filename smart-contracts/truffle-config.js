const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    amoy: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://polygon-amoy.g.alchemy.com/v2/${process.env.PROJECT_ID}`),
      network_id: 80002,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  compilers: {
    solc: {
      version: "0.8.21",
    }
  }
};
