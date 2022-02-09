import React from 'react';
import { Link } from 'react-router-dom';
import { BsTwitter,
    BsCoin} from "react-icons/bs";
import Follow from './buttons/Follow';
import { GET_IDENTITY } from '../query'; 
import { detectProvider } from '../utils';
import { ethers } from 'ethers';
import { useState } from 'react';
import png from '../img/empty-profile.png'

const FeaturedProfile = (props) => {
    const [ethAmount, setEthAmount] = useState(0);
    const Address = props.address

    const sendTip =  () => {
        console.log("tipping")
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

    return (
        <div className='featured-btn'>
            <div className='title-address'>
                {
                    props.domain ? props.domain
                    :
                    props.address
                }
            </div>
            <div className='avatar-wrap'>
                
                <Link to={`/explorer/${props.address}`}>
                    {
                        props.avatar ?
                        <img className='avatar-img' src={props.avatar} alt="" />
                        :
                        <img className='avatar-img' src={png} alt="" />
                    }
                    
                </Link>
            </div>
            <div className='f-stats'>
                <div className='followers'>
                    <div className='stat-num'>{props.followerCount}</div>
                    <div className='stat-title'>Followers</div>
                </div>
            </div>
            <div className='reason'>
                {props.reason }
            </div>
            <div className='socials'>
                <div>
                    <Follow />
                </div>                       
                <div className='tip-wrap'>
                    <button className='tip-btn' onClick={sendTip}>
                        <div className='coin'><BsCoin /></div>
                    </button>
                    <input className='tip-amount' type="text"  placeholder='ETH' onChange={(e)=>{setEthAmount(e.target.value)}}/>
                </div>
                
            </div>
        </div>
    );
};

export default FeaturedProfile;
