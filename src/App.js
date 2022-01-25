import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
const faucetJson = require("./utils/Faucet.json");

function App() {
  // pure JS
  const { ethereum } = window;

  if(!ethereum) {
    console.log("You don't appear to have MM! Install MetaMask!");
  } else {
    console.log("Provider detected!", ethereum);
  }

  ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new ethers.providers.Web3Provider(ethereum);

  const contractAddress = "0xc059E21c921AB5c00f5816bf70fA05Fc6257b679";
  const faucetABI = faucetJson.abi;
  const signer = provider.getSigner();

  const faucet = new ethers.Contract(contractAddress, faucetABI, signer);

  async function withdraw() {
    const amountToWithdraw = ethers.utils.parseUnits(".1", "ether");
    await faucet.withdraw(amountToWithdraw);
  }

  return (
    <div className="App">
      <div className="title">Our Faucet!</div>
      <button className="my-button" onClick={withdraw}>Withdraw!</button>
    </div>
  );
}

export default App;
