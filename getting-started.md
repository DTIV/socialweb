# Getting Started

* Clone Repository and Install dependencies.

```
npm install
```

```
yarn install
```

Once dependencies are installed, start the application with

```
npm start
```

```
yarn start
```

The application connects to an Ethereum Node, so an .env file will need to be created for a Infura or Alchemy URL

{% embed url="https://www.alchemy.com" %}

{% embed url="https://infura.io" %}

Create a .env file using the sample\_env file provided. Using your Alchemy/Infura URL and a private key to create a connection to a Ethereum Node.

```
ALCHEMY_RINKEBY = "ALCHEMY_RINKEBY_URL"
PRIVATE_KEY = "METAMASK_PRIVATE KEY"
```
