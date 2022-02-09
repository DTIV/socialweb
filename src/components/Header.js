import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ConnectButton from './ConnectButton';

const Header = (props) => {
    useEffect(() => {
        const elem = document.getElementById('network-select');
        elem.value = props.currentNetwork
    }, [props.currentNetwork])

    return(
    <div className='navbar'>
        <div>
            <Link to="/">
            <span className='social-logo'>Social</span><span className='web-logo'>Web</span> 
            </Link>
        </div>
        <div className='menu'>
            <div>
                <Link to="/search">
                    Search
                </Link>
            </div>
            <div>
                <a href="https://dtiv.gitbook.io/socialweb/" target="_blank">
                    Docs
                </a>
            </div>
            
        </div>
        <div className='sidenav-netwrap'>
            <div className='account-menu-txt'>
                {props.account.slice(0,2)+"..."+props.account.slice(38,43)}
            </div>
            <select className='connect-btn' name="" id="network-select">
                <option value={1}>Mainnet</option>
                <option value={4}>Rinkeby</option>
                <option value={56}>BSC</option>
                <option value={96}>MATIC</option>
                <option value={1336}>AVAX</option>
            </select>
            <div>
                <ConnectButton connecting={props.connecting} connected={props.connected} connect={props.connect} />
            </div>
            
        </div>
        
    </div>
    )
};

export default Header;
