import React, { useState, useEffect, useContext, useRef } from "react";
// import WalletContext, { WalletProvider } from "../context/WalletContext";
import Web3 from "web3";
import MessageContract from "../build/Message.json";
import { Message } from "./Message";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Wellcome } from "./Wellcome";

function App() {
  const [messages, setMessages] = useState("");
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [web3Provider, setWeb3Provider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chainId, setChainId] = useState("");
  const [networkId, setNetworkId] = useState("");
  const [metamaskError, setMetamaskError] = useState("");
  const [contractData, setContractData] = useState("");
  const [contract, setContract] = useState("");

  const logout = () => {
    setIsConnected(false);
  };

  const login = async () => {
    if (typeof window.ethereum !== "undefined") {
      let web3 = await new Web3(window.ethereum);
      setWeb3Provider(web3);
      const accounts = await web3.eth.requestAccounts();
      // console.log("🚀 ~ file: App.jsx ~ line 31 ~ login ~ accounts", accounts[0])
      setAccount(accounts[0]);

      let networkId = await web3.eth.net.getId();
      setNetworkId(networkId);
      let chainId = await web3.eth.getChainId();
      setChainId(chainId);
      let messageContractData = await MessageContract.networks[networkId];
      console.log(
        "🚀 ~ file: App.jsx ~ line 38 ~ login ~ messageContractData",
        messageContractData.address
      );
      setContractData(messageContractData);
      const MessageCtr = new web3.eth.Contract(
        MessageContract.abi,
        messageContractData.address
      );
      console.log(
        "🚀 ~ file: App.jsx ~ line 43 ~ login ~ MessageCtr",
        MessageCtr
      );
      setContract(MessageCtr);
      setIsConnected(true);
    } else {
      console.log("MetaMask not installed!");
    }
  };

  return (
    <div className="is-flex is-flex-direction-column is-justify-content-space-between is-fullheight">
      <div className=" is-flex is-fullheight is-flex-direction-column is-justify-content-space-between">
        <nav className="navbar " role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
             <h1 className="title has-text-primary	">Message Dapp</h1>
            </a>

            <a
              role="button"
              className={`navbar-burger burger ${
                navbarOpen ? "is-active" : ""
              }`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={() => {
                setNavbarOpen(!navbarOpen);
              }}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navbarBasicExample"
            className={`navbar-menu ${navbarOpen ? "is-active" : ""}`}
          >
            <div className="navbar-start">
              <a className="navbar-item">Home</a>

              <a className="navbar-item">Documentation</a>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">More</a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">About</a>
                  <a className="navbar-item">Jobs</a>
                  <a className="navbar-item">Contact</a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">Report an issue</a>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <button className="button is-primary" onClick={login}>
                  {account && account.length > 0
                    ? `Connected: ${account.substring(
                        0,
                        6
                      )}...${account.substring(38)}`
                    : "Login"}
                </button>
              </div>
            </div>
          </div>
        </nav>
        <section className="hero is-primary">
          <div className="hero-body">
            <p className="title">Awesome Message</p>
            <p className="subtitle">
              A beautifull decentralized message storage <br />
              Built with React | Solidity | Bulma | Truffle
            </p>
          </div>
        </section>

        <section className="section is-medium">
          {isConnected ? (
            <Message contract={contract} account={account} />
          ) : (
            <Wellcome />
          )}
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default App;
