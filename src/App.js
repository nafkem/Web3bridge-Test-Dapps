import logo from "./logo.svg";
import "./App.css";
import { Contract, ethers } from "ethers";
import { useState } from "react";
import abi from "./abi.json";

function App() {
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(0);
  const contractAddr = "0x9833A82B7a44f1C5649A34ec2487b9E1917E7d0e";
  const [contract, setContract] = useState(null);

  async function ConnectWallet() {
    let signer = null;
    let provider;
    if (window.ethereum == null) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
      setProvider(provider);
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner();
      setSigner(signer);
    }
    const balance = await provider.getBalance(signer?.address);
    setBalance(balance);
    const contract = new Contract(contractAddr, abi, signer);
    setContract(contract);
    console.log(abi);
  }

  async function handleMessage() {
    const newMessage = await contract.setMessage("Hello Nafkem!!");//withdraw();
    console.log(newMessage);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={ConnectWallet}>
          {signer == null ? "Connect Wallet" : signer?.address}
        </button>
        <button onClick={handleMessage}>Send Message</button>
      </header>
    </div>
  );
}

export default App;