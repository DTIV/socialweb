import styles from './Error.module.css'

const Error = (props:any) => {
    if(props.error.message){
        return (
            <div className={styles.error}>
                <div className={styles.errorCard}>
                    <div>
                        {props.error.message}
                    </div>
                    <div className={styles.errorBtnWrap}>
                        <a className={styles.errorBtn} onClick={props.close}>x</a>
                    </div>
                </div>
            </div>
        )
    }else{
        return <></>
    }
}

export default Error
