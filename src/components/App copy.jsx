import Web3 from 'web3';
import React, { useState, useEffect } from 'react'
import MessageContract from '../build/Message.json'

//import WalletConnect from './Web3Client';

function App() {

  const [web3Client, setWeb3Client] = useState(null)
  const [address, setAddress] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  async function connectWallet() {

    let web3 = new Web3(window.ethereum)
    setWeb3Client(web3)
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    //console.log("🚀 ~ file: App.jsx ~ line 8 ~ App ~ provider", accounts[0])

    let networkId = await web3.eth.net.getId()
    //console.log("🚀 ~ file: App.jsx ~ line 28 ~ connectWallet ~ networkId", networkId)
    let chainId = await web3.eth.getChainId()
    console.log("🚀 ~ file: App.jsx ~ line 31 ~ connectWallet ~ chainId", chainId)
    
    let messageContractData = await MessageContract.networks[networkId]
    console.log("🚀 ~ file: App.jsx ~ line 32 ~ connectWallet ~ messageContractData", messageContractData)
    
    const Message =  new web3.eth.Contract(MessageContract.abi, messageContractData.address)    
    console.log("🚀 ~ file: App.jsx ~ line 36 ~ connectWallet ~ MessageContract", Message)

    //console.log(Message.methods.message.call({from: accounts[0]}));

    await Message.methods.setMessage('Hello from web3').send( {from: accounts[0]}).then( function(tx) {
      console.log("Transaction: ", tx);
    });
    
    Message.methods.getMessage().call().then( function(tx) {
      console.log(tx)
    })

    setIsConnected(true)
    console.log("🚀 ~ file: App.jsx ~ line 43 ~ connectWallet ~ setIsConnected", isConnected)
    
  } 

  return (
    <div className="App">
      <h1>HOla Mundo</h1>

     
      { 
        isConnected ? 
        <h1>Hello! {account} </h1> : 
        <button className="btn" onClick={connectWallet}>Connect</button>
      }
     

      
    </div>
  );
}

export default App;