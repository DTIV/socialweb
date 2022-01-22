
# TypeScript Web3 Boilerplate Q1-2022

This is a Typescript React boilerplate utilizing Ethers.js and Hardhat. This boilerplate provides a basic setup for connecting with MetaMask, deploying and tesing Solidity smart contracts with Hardhat, and interacting with them using Ethers.js.  


## Clone this repo 

1. Install dependancies
    ```
    npm install
    ```

## Create this Boilerplate yourself:

1. Create react app
    ```react
    npx create-react-app my-app --template typescript 
    ```
2. Install Ethers.js
    ```react
    npm install --save ethers
    ```
3. Declare window type
    - declare window type for typescript
    ```
    declare let window : any;
    ```

4. install hardhat and dependencies in react application folder
    ```
    cd my-app
    npx hardhat
    create basic project
    ```

5. create a folder for hardhat files in src directory
    ```
    cd src
    mkdir hardhat
    cd hardhat
    ```

6. move contracts, scripts and test folder into the hardhat folder

7. Add paths to module.exports in hardhat.configjs
    ```
    paths: {
        artifacts: "./src/hardhat/artifacts",
        sources: "./src/hardhat/contracts",
        cache: "./src/hardhat/cache",
        tests: "./src/hardhat/test"
    },
    ```
8. Add Different Networks
    ```
    networks:{
        rinkeby : {
            url: RINKEBY_URL,
            accounts: [PRIVATE_KEY]
        },
        ganache:{
            url: "RPC_SERVER",
            accounts: [PRIVATE_KEY]
        }
    },
    ```

9. Add Networks and mainnet forking to access contracts
    ```
    networks:{
        hardhat: {
            forking: {
                url: "ALCHEMY_API_URL"
            }
        }
    }, 
    ```

10. Test & Deploy
    ```
    npx hardhat test
    npx hardhat run src/hardhat/scripts/deploy.js --network rinkeby
    ```