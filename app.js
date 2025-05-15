import { uploadToIPFS } from './ipfs.js';

let userAccount;

window.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connectWallet');
  const walletAddress = document.getElementById('walletAddress');

  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask is not installed!');
    return;
  }

  connectButton.addEventListener('click', async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      walletAddress.innerText = `Connected: ${userAccount}`;
    } catch (err) {
      console.error('Wallet connection failed', err);
      walletAddress.innerText = ' Wallet connection failed';
    }
  });

  // 👇 This is your existing offer submission logic
  const submitOffer = document.getElementById('submitOffer');

  submitOffer.addEventListener('click', async () => {
    const energy = document.getElementById('energyAmount').value;
    const price = document.getElementById('pricePerUnit').value;
    const status = document.getElementById('offerStatus');

    if (!userAccount) {
      status.innerText = "Please connect MetaMask first.";
      return;
    }

    if (!energy || !price) {
      status.innerText = " Missing values!";
      return;
    }

    const tradeData = {
      energy,
      price,
      timestamp: new Date().toISOString(),
      user: userAccount,
    };

    status.innerText = " Uploading to IPFS...";
    const ipfsHash = await uploadToIPFS(tradeData);

    status.innerText = `Stored on IPFS: ${ipfsHash}`;
  });
});
