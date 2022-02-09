import React from 'react';
import { GET_FOLLOWERS } from '../query';
import {
    useQuery,
  } from "@apollo/client";

import { useState } from 'react';
import { Link } from 'react-router-dom';
const Followers = (props) => {
    const follow = props.pageList
    const address = props.address
    const cursor = props.cursor.toString()
    const nextpage = props.hasNextPage
    const prevpage = props.hasPrevPage
    const { loading, error, data } = useQuery(GET_FOLLOWERS, { variables : { "Address":address, "After": cursor}});
    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if(error){
        console.log(error)
        return(
            <div>ERROR</div>
        )
    }
    const pageList = data.identity.followers.list
    
    const hasNextPage = data.identity.followers.pageInfo.hasNextPage
    const hasPrevPage = data.identity.followers.pageInfo.hasPreviousPage
    if(pageList.length > 0){
        return (
            <div>
                <div className='social-addr'>
                    {
                        pageList.map((fan) => (
                            <div key={fan.address} className="single-addr">
                                <a href={`/explorer/${fan.address}`} >
                                {
                                    fan.domain ?
                                    fan.domain
                                    :
                                    fan.address
                                }
                                </a>
                            </div>
                            
                        ))
                    }
                </div>
                <div >
                    <div className='page-wrap'>
                        {
                            props.cursor > 0 ?
                            <div className='page-btn'>
                                <button className='basic-btn' onClick={props.loadPrev}>Prev</button>
                            </div>
                            :<></>
                        }

                        {
                            hasNextPage ?
                            <div className='page-btn'>
                                <button className='basic-btn' onClick={props.loadNext}>Next</button>
                            </div>
                            :<></>
                        }
                    </div>
                    
                </div>
            </div>
        )
        
    }
    return(
        <div>
            <div>No Followers Yet.</div>
        </div>
        
    )
};

export default Followers;
