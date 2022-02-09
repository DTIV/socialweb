import React from 'react';
import { GET_FEATURED } from '../query'; 
import {
    useQuery,
} from "@apollo/client";
import FeaturedProfile from './FeaturedProfile';
import $, { css } from 'jquery';

const Showcase = () => {
    $('body').css({"overflow": "visible"})
    const { loading, error, data } = useQuery(GET_FEATURED);
    if(loading){
        return(
            <div>Loading...</div>
        )
    }
    if(error){
        return(
            <div>Error</div>
        )
    }
    return ( 
        <div className='showcase'>
            <div className='featured-wrap'>   
                <div className='show-title'>
                    FEATURED
                </div>
                <div className='featured-list'>
                    {
                        data.featured.map((feature) => (
                            <div key={feature.address}>
                                <FeaturedProfile 
                                    address={feature.address}
                                    avatar={feature.avatar}
                                    domain={feature.domain}
                                    followerCount={feature.followerCount}
                                    reason={feature.recommendationReason}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Showcase;
