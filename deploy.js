const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const mneumonic = 'tattoo pioneer maximum roof result tomato involve index strategy radar bike still';
const api = 'https://rinkeby.infura.io/v3/96d56aba0a1141a69f484f3be6509343';

const provider = new HDWalletProvider(
  mneumonic, // Mneumonic Phrase
  api // Node we want to connect to
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
