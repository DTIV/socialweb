import React from 'react';
import { Link,Route } from 'react-router-dom';
import { ethers } from 'ethers';
const TxList = (props) => {
    const transactions = props.txlist
    if(transactions){
        return transactions.map((tx)=>(
            <div key={tx.hash} className='transaction-row'>
                <div>{tx.timestamp}</div>
                <div>
                    <a className='' href={`/explorer/${tx.from}`}>{tx.from}</a>
                </div>
                <div>
                    <a href={`/explorer/${tx.to}`}>{tx.to}</a>
                </div>
                <div>
                    {Number(ethers.utils.formatEther(tx.value)).toPrecision(6)} <small>ETH</small>
                </div>
            </div>
        ))
    }
    else{
        return(
            <div>
                Loading
            </div>
        )
    }
};

export default TxList;
