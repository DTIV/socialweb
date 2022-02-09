import React from 'react';
import { Link } from 'react-router-dom';
import { BsTwitter,
    BsCoin} from "react-icons/bs";
import Follow from './buttons/Follow';
import { GET_IDENTITY } from '../query'; 
import { detectProvider } from '../utils';
import { ethers } from 'ethers';
import { useState } from 'react';

const SearchProfile = ({data, connected, provider}) => {
    const [ethAmount, setEthAmount] = useState(0);
    const Address = data.identity.address

    const sendTip =  () => {
        if(!connected){
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
    
    return(
        <div className='profile-btn'>
            <div className='title-address'>
                {
                    data.identity.ens ? data.identity.ens
                    :
                    data.identity.address
                }
            </div>
            <div className='avatar-wrap'>
                <Link to={`/explorer/${data.identity.address}`}>
                    <img className='avatar-img' src={data.identity.avatar} alt="" />
                </Link>
            </div>
            <div className='stats'>
                <div className="following">
                    <div className='stat-num'>{data.identity.followingCount}</div>
                    <div className='stat-title'>Following</div>
                </div>
                <div className='followers'>
                    <div className='stat-num'>{data.identity.followerCount}</div>
                    <div className='stat-title'>Followers</div>
                </div>
            </div>
            <div className='socials'>
                {
                    data.identity.social.twitter ?
                    <div className='twitter'>
                        <a  href={data.identity.social.twitter}>
                            <BsTwitter className='bird'/>
                            </a>
                    </div>
                    : <div className='twitter'>
                        <a className='bird' href={data.identity.social.twitter}><BsTwitter /></a>
                    </div>
                }
                <div>
                    <Follow 
                        provider={provider}
                        address={data.identity.address}/>
                </div>                       
                <div className='tip-wrap'>
                    <button className='tip-btn' onClick={sendTip}>
                        <div className='coin'><BsCoin /></div>
                    </button>
                    <input className='tip-amount' type="text"  placeholder='ETH' onChange={(e)=>{setEthAmount(e.target.value)}}/>
                </div>
                
            </div>
        </div>
        
    )
};

export default SearchProfile;
