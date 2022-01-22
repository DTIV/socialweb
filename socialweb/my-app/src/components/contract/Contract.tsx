import styles from './Contract.module.css'
import {useState, useEffect } from 'react';
import { ethers } from "ethers";
declare let window : any;

const Contract = (props:any) => {
    const abi = props.abi
    const contractAddress = props.contract
    const [connected, setConnected] = useState<any>(false);
    const [tokenBalance, setTokenBalance] = useState<any>("")
    const [getContract, setContract] = useState<any>("")
    const [getAmount, setAmount] = useState<any>("")
    const [getToAddress, setToAddress] = useState<any>("")
    const [getProvider, setProvider] = useState<any>(false);
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

    const callContract = async () => {
        const provider = detectProvider()
        const eth = new ethers.providers.Web3Provider(provider)
        const signer = await eth.getSigner()
        const address = await signer.getAddress()
        const TCBToken = await new ethers.Contract(contractAddress, abi, signer)
        const tokenBal = (await TCBToken.balanceOf(address)).toString()
        setTokenBalance(tokenBal)
        setContract(TCBToken)
        setProvider(provider)
        setConnected(true)
    }

    useEffect(() => {
        callContract()
    }, [])

    useEffect(() => { 
        // Handle account and network changes
        const handleAccountsChanged = async () => {
            callContract()
        }

        if(connected){
            getProvider.on('accountsChanged', handleAccountsChanged);
            return () => {
                getProvider.removeListener('accountsChanged', handleAccountsChanged);
            }
        }
    }, [connected])

    const transferToken = async () => {
        try{
            const TCBToken = getContract
            const tx = await TCBToken.transfer(getToAddress, getAmount)
            const receipt = await tx.wait();
            callContract()
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div className={styles.contract}>
            <div className='tac'><h2>Contract Interaction</h2></div>
            <div className={styles.transferWrap}>
                <div>
                    Token Balance: {tokenBalance}
                </div>
                <div>
                    <input className={styles.transferInput} type="text" placeholder='Amount' onChange={(e) => {setAmount(e.target.value)}}/>
                </div>
                <div>
                    <input className={styles.transferInput} type="text" placeholder='To' onChange={(e) => {setToAddress(e.target.value)}}/>
                </div>
                <div>   
                    <button className={styles.transferInput} onClick={transferToken}>Transfer</button>
                </div>
            </div>   
        </div>
    )
    
}

export default Contract
