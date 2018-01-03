
module.exports = function(deployer) {
  return MyScript(deployer);
}

async function MyScript(deployer) {
  const { abi } = require('./ConnextVault')

  const from = '0x...' // who is sending transaction
  const vaultAddress = '0x...'
  const tokenContractAddress = '0x...'
  const recipientAddress = '0x...'
  const amountInEther = '0.5'

  const Vault = web3.eth.contract(abi)
  const vaultInstance = Vault.at(vaultAddress)
  const amount = web3.toWei(amountInEther, 'ether')

  vaultInstance.transactVault(
    'Connext API transaction',
    tokenContractAddress,
    recipientAddress,
    amount,
    {from: from},
    (error, result) => {
      if (error) {
        console.log('-------error-------')
        console.error(error)
      } else {
        console.log(result)
      }
    }
  )
}
