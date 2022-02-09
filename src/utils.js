export const detectProvider = () => {
    // Get provider
    let provider;
    if(window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    }else{
      window.alert("No Ethereum browser detected")
    }
    return provider
}

export const getNetworkData = (currentNetwork) => {
  if(currentNetwork == 1){
    const url = process.env.REACT_APP_ALCHEMY_MAINNET
    const network = "mainnet"
    return [url, network]
  }else if(currentNetwork ==4){
    const url = process.env.REACT_APP_ALCHEMY_RINKEBY
    const network = "rinkeby"
    return [url, network]
  }
}