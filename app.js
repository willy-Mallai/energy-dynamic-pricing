let userAccount;

window.addEventListener('DOMContentLoaded', () => {
  const connectButton = document.getElementById('connectWallet');
  const walletAddress = document.getElementById('walletAddress');
  const submitOffer = document.getElementById('submitOffer');

  // Check for MetaMask
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask is not installed!');
    return;
  }

  // Connect to MetaMask
  connectButton.addEventListener('click', async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];
      walletAddress.innerText = `Connected: ${userAccount}`;
    } catch (err) {
      console.error('User denied account access', err);
    }
  });

  // Handle Offer Submission
  submitOffer.addEventListener('click', () => {
    const energy = document.getElementById('energyAmount').value;
    const price = document.getElementById('pricePerUnit').value;

    if (!userAccount) {
      alert('Please connect MetaMask first.');
      return;
    }

    if (!energy || !price) {
      alert('Please enter energy amount and price.');
      return;
    }

    console.log(`Submitting offer: ${energy} kWh @ ${price} ETH/kWh`);

    // 🔧 This is where you'll call the smart contract method later
    // For now, just simulate
    alert(`Offer submitted: ${energy} kWh @ ${price} ETH/kWh`);
  });

  // Set placeholder for market price
  document.getElementById('marketPrice').innerText = '0.08 ETH/kWh (example)';
});
