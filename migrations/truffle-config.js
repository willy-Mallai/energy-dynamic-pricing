const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env file if it exists
require('dotenv').config();

// Read private key or mnemonic from environment variables or file
const privateKey = process.env.PRIVATE_KEY;
const mnemonic = process.env.MNEMONIC || fs.readFileSync('.secret').toString().trim();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. 
   */
  networks: {
    // Development network (Ganache)
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ganache port
      network_id: "5777",    // Ganache network id
      gas: 6721975,          // Gas limit
      gasPrice: 20000000000  // 20 gwei
    },

    // You can add other network configurations here:
    // Example configurations shown below, uncomment and customize as needed

    /*
    // Ethereum Mainnet
    mainnet: {
      provider: () => new HDWalletProvider(
        privateKey || mnemonic,
        `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      network_id: 1,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },

    // Sepolia Testnet
    sepolia: {
      provider: () => new HDWalletProvider(
        privateKey || mnemonic,
        `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    */
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.20",    // Specify compiler version
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "istanbul"
      }
    }
  },

  // Truffle DB is currently disabled by default
  db: {
    enabled: false
  }
};
