import Web3 from 'web3';
import { useState, useEffect } from 'react';

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const web3 = new Web3(window.ethereum);

  const getAccountInfo = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      const balance = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(balance));
    } catch (error) {
      console.log(error);
    }
  };

  const connectAccount = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      getAccountInfo();
    } else {
      alert("Please Install the Ethereum");
    }
  }


  window.ethereum.on('accountsChanged', getAccountInfo);

  const handleDisconnect =async () => {
    // Remove event listener for account change
    await window.ethereum.removeAllListeners('accountsChanged');

    // Clear account and balance state variables
    setAccount('');
    setBalance('');
  };


  return (
    <div>
      {account ? (
        <>
          <p>Connected to account:- <b>  {account}</b></p>
          {balance && <p>Account balance:- <b> {balance} ETH </b></p>}
          <button onClick={handleDisconnect}>Disconnect</button>
        </>
      ) : (
        <>
          <p>Please connect your Ethereum account</p>
          <button onClick={e => connectAccount()}>Connect</button>
        </>
      )}
    </div>
  );
}

export default App;
