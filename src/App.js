import { useState } from "react";
import { ethers } from "ethers";
import logo from "./logo.svg";
import "./App.css";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [greeting, setGreeting] = useState("");

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const resetGreeting = async () => {};
  const fetchGreeting = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  };
  const setGreetingval = async () => {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  };
  return (
    <div>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={setGreetingval}>Set Greeting</button>
      <input type='text ' onChange={(e) => setGreeting(e.target.value)} />
    </div>
  );
}

export default App;
