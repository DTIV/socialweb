
const EtherBalance = (props:any) => {
    if(props.balance){
        return (
            <div className="tac">
                Balance: {props.balance}
            </div>
        )
    }else{
        return (
            <></>
        )
    }
    
}

export default EtherBalance
