import React from 'react'
import styles from './Account.module.css'

const Account = (props:any) => {
    if(props.account){
        return (
            <div>
                <div className={styles.account}>{props.account}</div>
            </div>
            
        )
    }else{
        return <></>
    }
    
}

export default Account
