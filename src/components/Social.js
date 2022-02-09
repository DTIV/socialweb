import React from 'react';
import Following from './Following';
import Followers from './Followers';
import { useState } from 'react';

const Social = (props) => {
    // FOLLOWER
    const [followerHasNextPage, followerSetHasNextPage] = useState(props.followers.pageInfo.hasNextPage);
    const [followerHasPrevPage, setFollowerHasPrevPage] = useState(props.followers.pageInfo.hasPreviousPage);
    const [followerCursor, setFollowerCursor] = useState(props.followers.pageInfo.startCursor)
    const [followerEndCursor, setFollowerEndCursor] = useState(props.followers.pageInfo.endCursor)
    const [followerPageList, setFollowerPageList] = useState(props.followers.list)
    const [followerPageNo, setFollowerPageNo] = useState(1)
    
    const loadFollowerPrev = () => {
        const prevpg = (Number(followerEndCursor) - 19).toString()
        setFollowerCursor(prevpg-19)
        setFollowerEndCursor(prevpg)
        setFollowerPageNo(followerPageNo-1)
    }
  
    const loadFollowerNext = () => {
        const nextpg = (Number(followerEndCursor) + 19).toString()
        setFollowerEndCursor(nextpg)
        setFollowerPageNo(followerPageNo+1)
        setFollowerHasPrevPage(true)
        setFollowerCursor(followerEndCursor)
    }

    // FOLLOWING
    const [followingHasNextPage, followingSetHasNextPage] = useState(props.followers.pageInfo.hasNextPage);
    const [followingHasPrevPage, setFollowingHasPrevPage] = useState(props.followers.pageInfo.hasPreviousPage);
    const [followingCursor, setFollowingCursor] = useState(props.followers.pageInfo.startCursor)
    const [followingEndCursor, setFollowingEndCursor] = useState(props.followers.pageInfo.endCursor)
    const [followingPageList, setFollowingPageList] = useState(props.followers.list)
    const [followingPageNo, setFollowingPageNo] = useState(1)

    const loadFollowingPrev = () => {
        const prevpg = (Number(followingEndCursor) - 19).toString()
        setFollowingCursor(prevpg-19)
        setFollowingEndCursor(prevpg)
        setFollowingPageNo(followingPageNo-1)
    }
  
    const loadFollowingNext = () => {
        const nextpg = (Number(followingEndCursor) + 19).toString()
        setFollowingEndCursor(nextpg)
        setFollowingPageNo(followingPageNo+1)
        setFollowingHasPrevPage(true)
        setFollowingCursor(followingEndCursor)
    }

    return (
        <div className='social-card'>
            <div>
                <div className='top-title'>Followers</div>
                <Followers 
                pageList={followerPageList} 
                address={props.address}
                cursor={followerCursor}
                endCursor={followerEndCursor}
                hasNextPage={followerHasNextPage}
                hasPrevPage={followerHasPrevPage}
                loadNext={loadFollowerNext}
                loadPrev={loadFollowerPrev}
                pageNo={followerPageNo}/>
                
            </div>
           
            <div>
                <div className='top-title'>Following</div>
                <div>
                    <Following
                        pageList={followingPageList} 
                        address={props.address}
                        cursor={followingCursor}
                        endCursor={followingEndCursor}
                        hasNextPage={followingHasNextPage}
                        hasPrevPage={followingHasPrevPage}
                        loadNext={loadFollowingNext}
                        loadPrev={loadFollowingPrev}
                        pageNo={followingPageNo}/>
                </div>
            </div>
        </div>
    );
};

export default Social;
