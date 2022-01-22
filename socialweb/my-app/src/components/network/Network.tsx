import styles from './Network.module.css'

const Network = (props:any) => {
    if(props.currentNetwork){
        return (
            <div className={styles.network}> 
                <div>
                  Network: {props.currentNetwork}
                </div>
            </div>
        )
    }else{
        return <></>
    }
    
}

export default Network
