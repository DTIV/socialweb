import React from 'react';
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import {
    FollowButton,
    Env,
    Blockchain,
  } from '@cyberconnect/react-follow-button';

const Follow = (props) => {
  if(props.provider){
    console.log(props.provider)
    return (
      <div className='follow-wrap'>
        {/* <AiOutlineUserAdd className='follow'/> */}
        <FollowButton
          provider={props.provider}
          namespace="CyberConnect"
          toAddr={props.address}
          env={Env.STAGING}
          chain={Blockchain.ETH}
          onSuccess={(e) => {
              console.log(e);
          }}
          onFailure={(e) => {
              console.log(e);
          }}
          />
      </div>
    )
  }else{
    return(
      <div className='follow-wrap'>
          <button className='follow-btn'>
              <AiOutlineUserAdd className='follow'/>
          </button>
      </div>
    )
  }
  
};

export default Follow;
