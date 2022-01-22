import { useState, useEffect } from "react";
import { ethers } from "ethers";
import TokenAddress from './contractData/contracts-address.json'
import TokenArtifacts from './contractData/Token.json'
import Header from './components/header/Header';
import Account from './components/account/Account';
import State from './components/state/State';
import Network from "./components/network/Network";
import Error from './components/error/Error';
import ConnectButton from './components/connect/ConnectButton';
import EtherBalance from './components/balance/EtherBalance'
import Contract from './components/contract/Contract'
declare let window : any;

function App() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [getError, setError] = useState<any>(false);
  const [getCurrentAccount, setCurrentAccount] = useState("");
  const [getCurrentNetwork, setCurrentNetwork] = useState<any>("");
  const [getProvider, setProvider] = useState<any>(false);
  const [getEtherBal, setEtherBal] = useState<any>("");

  const token = TokenAddress.Token
  const abi = TokenArtifacts.abi

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
      .then((res:any) => {
        if(res.length > 0){
          setConnected(true)
          onConnect(provider)
        }else{
          Disconnect()
        }
      })
    }
  },[getCurrentAccount, getProvider])

  useEffect(() => { 
    // Handle account and network changes
    const handleAccountsChanged = async () => {
      const accounts = await getProvider.request({method: 'eth_accounts'})
      setCurrentAccount(accounts)
    }

    const handleNetworkChanged = async () => {
      const chainId = await getProvider.request({ method: 'eth_chainId' });
      setCurrentNetwork(parseInt(chainId))
    }

    if(connected){
      getProvider.on('accountsChanged', handleAccountsChanged);
      getProvider.on('chainChanged', handleNetworkChanged);
      return () => {
        getProvider.removeListener('accountsChanged', handleAccountsChanged);
        getProvider.removeListener('chainChanged', handleNetworkChanged);
      }
    }
  }, [connected, getProvider])
  
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
      }catch(err: any){
        setError(err);
      }
      onConnect(getProvider)
      setConnecting(false);
    }
  }

  const onConnect = async (provider:any) => {
    // ETHERS.JS CONNECT
    const chain_id = await provider.request({ method: 'eth_chainId' })
    const eth = new ethers.providers.Web3Provider(provider);
    const accounts = await eth.listAccounts()
    try{
      const weiBalance = (await eth.getBalance(accounts[0])).toString()
      const etherBalance = (Number(weiBalance)/10**18).toFixed(5)
      provider.request({ method: 'eth_accounts' })
      .then((res:any) => {
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

  return (
    <div className="App">
      <div className="app-wrap">
        <Header />
        <div className="main-wrap">
          <div className="title"><h2>MetaMask Connection</h2></div>
          <ConnectButton connecting={connecting} connected={connected} connect={Connect} />
          <Account account={getCurrentAccount}/>
          <State connected={connected}/>
          <Network currentNetwork={getCurrentNetwork}/>
          <Error error={getError} close={closeError}/>
          <EtherBalance balance={getEtherBal}/>
        </div>
        <div className="contract-wrap">
          <Contract abi={abi} contract={token} connected={connected}/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
