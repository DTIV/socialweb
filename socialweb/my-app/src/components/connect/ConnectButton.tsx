import styles from './ConnectButton.module.css'

const ConnectButton = (props:any) => {
    if(props.connecting){
        return (
            <div className={styles.connectWrap}>
                <button className={styles.connectBtn} disabled>Connecting...</button>
            </div>
        ) 
    }else{
        if(props.connected){
            return(
                <></>
            )   
        }else{
            return(
                <div className={styles.connectWrap}>
                    <button className={styles.connectBtn} onClick={props.connect}>Connect to Metamask</button>
                </div>
            )
        }
    }
}
export default ConnectButton
