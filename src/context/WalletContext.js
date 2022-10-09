import React, {useState, useEffect, createContext} from 'react';
import Web3 from 'web3';
import MessageContract from '../build/Message.json';

const WalletContext = createContext()

export const WalletProvider = (props) => {

    const [web3Provider, setWeb3Provider] = useState(null)
    const [address, setAddress] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const [chainId, setChainId] = useState('')
    const [networkId, setNetworkId] = useState('')
    const [metamaskError, setMetamaskError] = useState('')
    const [contractData, setContractData] = useState('')
    const [contract, setContract] = useState('')

    const logout =  () => {  
      setIsConnected(false)
    }

    const login = async () => {

        if( !isConnected) {
          try {
            // connect web3
            let web3 = new Web3(window.ethereum)
            setWeb3Provider(web3)
            // get acounts
            const accounts = await web3.eth.getAccounts()
            setAddress(accounts[0])
    
            if ( accounts ) {
              let networkId = await web3.eth.net.getId()
              setNetworkId(networkId)
              let chainId = await web3.eth.getChainId()
              setChainId(chainId)
              let messageContractData = await MessageContract.networks[networkId]
              //console.log("🚀 ~ file: WalletContext.js ~ line 39 ~ login ~ messageContractData", messageContractData)
              setContractData(messageContractData)
              const MessageCtr =  new Web3.eth.Contract(MessageContract.abi, messageContractData.address)    
             
              setContract(MessageCtr)
             
              // console.log("🚀 ~ file: WalletContext.js ~ line 42 ~ login ~ MessageCtr", MessageCtr)
              // await MessageCtr.methods.setMessage('Hello from web3').send( {from: accounts[0]}).then( function(tx) {
              //   console.log("Transaction: ", tx);
              // });
              
              // MessageCtr.methods.getMessage().call().then( function(tx) {
              //   console.log(tx)
              // })

              
            } else {
              console.log("No accounts found")
            }
    
          } catch (error) {
            setMetamaskError(error)
          }

        


          setIsConnected(true)
        }
      } 

    return  (
        <WalletContext.Provider value= {{
            web3Provider,
            address,
            isConnected,
            chainId,
            networkId,
            metamaskError,
            contractData,
            contract,
            login,
            logout,
        }}>
            {props.children}
        </WalletContext.Provider>
    )
}

export default WalletContext;
//export const useWalletProvider = () => React.useContext(WalletProvider);

