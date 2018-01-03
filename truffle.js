const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic = ''
const INFURAKEY = ''

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/${INFURAKEY}`)
      },
      network_id: '4'
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    }
  }
};