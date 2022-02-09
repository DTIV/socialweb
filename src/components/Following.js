import React from 'react';
import { GET_FOLLOWINGS } from '../query';
import {
    useQuery,
  } from "@apollo/client";

const Following = (props) => {
    const follow = props.pageList
    const address = props.address
    const cursor = props.cursor.toString()
    const nextpage = props.hasNextPage
    const prevpage = props.hasPrevPage
    const { loading, error, data } = useQuery(GET_FOLLOWINGS, { variables : { "Address":address, "After": cursor}});
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

    const pageList = data.identity.followings.list
    
    const hasNextPage = data.identity.followings.pageInfo.hasNextPage
    const hasPrevPage = data.identity.followings.pageInfo.hasPreviousPage

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
                <div className='page-wrap'>
                    <div>
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
            <div className='social-addr'>No followings Yet.</div>
        </div>
        
    )
};

export default Following;
