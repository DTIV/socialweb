import styles from './State.module.css'

const State = (props:any) => {
    if(props.connected){
        return (
            <div className={styles.state}>
                <div className='dot connected-dot'></div>
                <div>CONNECTED</div>
            </div>
        )
    }else{
        return(
            <div className={styles.state}>
                <div className='dot disconnect-dot'></div>
                <div>DISCONNECTED</div>
            </div>
        )
    }
    
}

export default State
