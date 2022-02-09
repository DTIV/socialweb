import React from 'react';
import $, { css } from 'jquery';
import { BsChevronLeft,
    BsChevronRight,
    BsChevronDown,
    BsChevronUp,
    BsTwitter,
    BsCoin} from "react-icons/bs";

import {
    useQuery,
} from "@apollo/client";
import { GET_IDENTITY } from '../query';
import SearchProfile from './SearchProfile';

const fiSpeed = 1000;
const foSpeed = 1000;
const goBack = () => {
    $('.search-wrap').removeClass('animate-up')
    $('.explore-wrap').addClass('animate-down').fadeOut(foSpeed,function(){
        $('.search-wrap').fadeIn(fiSpeed).css({"display":"grid"})
    })
}

const SearchCard = (props) => {
    const Address = props.address;
    const { loading, error, data } = useQuery(GET_IDENTITY, { variables : { Address }});
    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if(error){
        console.log(error)
    }
    if(data){
        return (
            <div id='explore-wrap' className='explore-wrap'>
                <div className='explore-box'>
                    <div className='lt-space'></div>
                    <a href="#search" id="top-btn" className='explore-btn' onClick={goBack}><BsChevronUp /></a>
                    <div className='rt-space'></div>
                    <div></div>
                    <SearchProfile 
                        data={data}
                        connected={props.connected}
                        provider={props.provider}/>
                    <div></div>
                    <div className='lb-space'></div>
                    <div className='rb-space'></div>
                </div>
            </div>
        )
    }

    return <></>
};

export default SearchCard;
