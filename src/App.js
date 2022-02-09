import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Identity from "./components/Identity";
import SearchCard from "./components/SearchCard";
import Header from "./components/Header";
import { Routes,Router, Route, Link } from "react-router-dom";
import Explorer from "./components/Explorer";
import Showcase from "./components/Showcase";
function App() {
  
  const [getNode, setNode] = useState("");
  const [getAddress, setAddress] = useState("")
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [getError, setError] = useState(false);
  const [getCurrentAccount, setCurrentAccount] = useState("");
  const [getCurrentNetwork, setCurrentNetwork] = useState("");
  const [getProvider, setProvider] = useState(false);
  const [getEtherBal, setEtherBal] = useState("");


  useEffect(() => {
    if(!getNode){
      const node = NodeConnect()
      setNode(node)
      getAccount()
    }
  }, []);
  
  useEffect(async () => {
    const ff = await getAccount()
  }, [getNode]);
  

  useEffect(()=> {
    // Set provider and check connection
    const Disconnect = () => {
      setConnected(false)
      setCurrentAccount("")
      setCurrentNetwork("")
    }

    const provider = detectProvider()
    setProvider(provider)

    if(provider){
      provider.request({ method: 'eth_accounts' })
      .then((res) => {
        if(res.length > 0){
          setConnected(true)
          onConnect(provider)
        }else{
          Disconnect()
        }
      })
    }
  },[getCurrentAccount, getProvider])

  const NodeConnect = () => {
    // Get provider
    let ethNode;
    try{
      const url = process.env.REACT_APP_ALCHEMY_RINKEBY
      ethNode = new ethers.providers.JsonRpcProvider(url);
    }catch(err){
      console.log(err)
    }
    return ethNode
  }
  
  const getAccount = async () => {
    let accounts;
    if(getNode){
      accounts = await getNode.getBalance("vitalik.eth")
      return accounts
    }
  }

  const detectProvider = () => {
    // Get provider
    let provider;
    if(window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    }else{
      window.alert("No Ethereum browser detected")
    }
    return provider
  }

  const Connect = async () => {
    // METAMASK CONNECT
    if(getProvider) {
      if(getProvider !== window.ethereum) {
        console.error("Not window.ethereum provider!")
      }
      setConnecting(true);
      try{
        await getProvider.request({
          method: "eth_requestAccounts"
        })
      }catch(err){
        setError(err);
      }
      onConnect(getProvider)
      setConnecting(false);
      window.location.reload()
    }
  }

  const onConnect = async (provider) => {
    // ETHERS.JS CONNECT
    const chain_id = await provider.request({ method: 'eth_chainId' })
    const eth = new ethers.providers.Web3Provider(provider);
    const accounts = await eth.listAccounts()
    try{
      const weiBalance = (await eth.getBalance(accounts[0])).toString()
      const etherBalance = (Number(weiBalance)/10**18).toFixed(5)
      provider.request({ method: 'eth_accounts' })
      .then((res) => {
        if(res.length > 0){
          setConnected(true)
          setCurrentAccount(accounts[0])
          setCurrentNetwork(parseInt(chain_id))
          setEtherBal(etherBalance)
        }else{
          setConnected(false)
        }
      })
    }catch (err) {
      console.log(err)
    }
  }
  
  const closeError = () => {
    setError(false)
    setConnecting(false)
  }
  
  return(
      <div className="app">
          <Header 
            connecting={connecting} 
            connected={connected} 
            connect={Connect} 
            account={getCurrentAccount}
            currentNetwork={getCurrentNetwork}
            balance={getEtherBal}
            detect={detectProvider}
            closeError={closeError}/>
        <Routes>
            <Route exact path="/" element={<Showcase />}/>
            <Route exact path="/search" element={<Identity 
              save={setAddress}
              detect={detectProvider}
              connected={connected}
              provider={getProvider} />}/>
            <Route path="/explorer/:id" exact element={<Explorer 
              provider={getProvider} 
              currentNetwork={getCurrentNetwork}
              connected={connected}
              />}/>
        </Routes>
      </div>
  )
}

export default App;
