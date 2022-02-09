import React from 'react';
import { GET_IDENTITY } from '../query';
import {
  useQuery,
} from "@apollo/client";
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { BsCoin } from "react-icons/bs";
import Follow from './buttons/Follow';
import { getNetworkData } from '../utils';
import TxList from './TxList';
import { Link } from 'react-router-dom';
import png from '../img/empty-profile.png'
import $, { css } from 'jquery';
import Chart from './chart/Chart';
import { detectProvider } from '../utils';
import Social from './Social';

const Explorer = (props) => {

  $('body').css({"overflow": "visible"})
  const Address = (window.location.pathname).replace("/explorer/","")
  const [ethAmount, setEthAmount] = useState(0);
  const [getProvider, setProvider] = useState(0);
  const [getBalance, setBalance] = useState("");
  const [getTxCount, setTxCount] = useState("");
  const [getHistory, setHistory] = useState("");

  
  useEffect(async () =>  {
    const ndata = getNetworkData(props.currentNetwork)
    if(ndata){
      try{
        const url = ndata[0]
        const network = ndata[1]
        const apiKey= process.env.REACT_APP_ETHERSCAN
        const eth = new ethers.providers.JsonRpcProvider(url);
        const etherscan = new ethers.providers.EtherscanProvider(network,apiKey);
        const bal = await eth.getBalance(Address)
        const balance = ethers.utils.formatEther(bal);
        const his = await etherscan.getHistory(Address)
        const esBal = await etherscan.getBlockNumber()
        setProvider(eth)
        setBalance(Number(balance).toPrecision(7))
        setTxCount(his.length)
        setHistory(his.slice(-10))
      }catch(err){
        console.log(err)
      }
      
    }else{
      console.log("network error")
    }
    
  }, [props.currentNetwork]);
  
  const { loading, error, data } = useQuery(GET_IDENTITY, { variables : { Address }});

  const sendTip =  () => {
    if(!props.connected){
      alert("Connect to Metamask")
      return
    }
    const provider = detectProvider()
    const eth = new ethers.providers.Web3Provider(provider);
    const signer = eth.getSigner()
    if(ethAmount > 0){
        const tx = signer.sendTransaction({
            to: Address,
            value: ethers.utils.parseEther(ethAmount),
        });
    }
  }

  if(loading){
    return(
      <div>Loading...</div>
    )
  }
  if(error){
    console.log(error)
  }

  
  
  return (
  <div className='explorer-wrap'>
    <div className='explorer-card'>
      <div className='ex-nav'>
        {
          data.identity.avatar ?
          <div>
            <img className='av-thumb' src={data.identity.avatar} alt="" />
          </div>
          :
          <div>
            <img className='av-thumb' src={png} alt="" />
          </div>
        }
       
          <div>
            <div className='e-address'>
              {data.identity.address}
            </div>
            <div className='e-ens'>
              {data.identity.ens}
            </div>
          </div>
          <div className='e-socials'>
            <Follow 
            provider={props.provider}
            address={data.identity.address}/>
            <div className='tip-wrap'>
                <button className='tip-btn' onClick={sendTip}>
                    <div className='coin'><BsCoin /></div>
                </button>
                <input className='tip-amount' type="text"  placeholder='ETH' onChange={(e)=>{setEthAmount(e.target.value)}}/>
            </div>
          </div>
      </div>
      {
        props.connected ?
        <div className='ex-body'>
          <div className='top-stats'>
            <div className='balance-wrap'>
              <div className='balance'>
                {getBalance} <small>ETH</small>
              </div>
              <div className='top-title'>
                Balance
              </div>
            </div>
            <div>
              <div className='txcount-wrap'>
                <div className='tx-count'>
                  {getTxCount}
                </div>
                <div className='top-title'>
                  Tx Count
                </div>
              </div>
              
            </div>
          </div>
          <div className='chart'>
            <Chart balance={getBalance}/>
          </div>
          <div>
            <div className='transaction-table'>
              <div className='transaction-row tx-header'>
                <div>Date</div>
                <div>To</div>
                <div>From</div>
                <div>Amount</div>
              </div>
              <TxList txlist={getHistory} />
            </div>
          </div>
        </div>
        :
        <div className='connect-state'>
          Connect Wallet to view transaction history.
        </div>
      }
      
    </div>
    <div className='social-wrap'>
      <Social 
        followers={data.identity.followers}
        following={data.identity.followings}
        address={Address}/>
    </div>
  </div>)
};

export default Explorer;
