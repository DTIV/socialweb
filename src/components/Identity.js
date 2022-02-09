import React from 'react';
import { useState } from 'react'
import $, { css } from 'jquery';
import SearchCard from './SearchCard';

const Identity = (props) => {
    $('body').css({"overflow": "hidden"})
    const [getAddress, setAddress] = useState("vitalik.eth")
    const fiSpeed = 1000;
    const foSpeed = 1000;
    
    return(
        <div>
            <div id="search" className="search-wrap">
                <div className='search-card'>
                    <form action="" onSubmit={e=>{
                        e.preventDefault()
                        $('.explore-wrap').removeClass('animate-down').removeClass('animate-up')
                        $('.search-wrap').addClass('animate-up').fadeOut(foSpeed, function(){
                            $('.explore-wrap').fadeIn(fiSpeed).css({"display":"grid"});
                        });
                        console.log(getAddress)
                        props.save(getAddress)
                    }}>
                        <div className='input-wrap'>
                            <div>
                                <input className='search-input addy-input' type="text" default="vitalik.eth" placeholder='Enter Address or ENS' onChange={e=>setAddress(e.target.value)}/>
                            </div>
                            <div>
                                <input id="search-submit" className='search-input' type="submit"  value="Search"/>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
            {
            getAddress ? 
            <div>
                <SearchCard 
                address={getAddress}
                connected={props.connected}
                provider={props.provider}/>
            </div>
            : <></>
            }
        </div>
        
    )
};

export default Identity;
