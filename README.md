Purpose:
------

Example repo for working with the [Connext](https://connext.network/) token vault. For A full tutorial go [here](https://medium.com/hello-sugoi/connext-example-token-tutorial-2e5c7288d7c5). This is a fork of the [truffle](http://truffleframework.com/) tutorial [token box](https://github.com/truffle-box/tutorialtoken-box) that uses [open zeppelin](https://openzeppelin.org/) smart contracts. The original blog post is linked [here](http://truffleframework.com/tutorials/robust-smart-contracts-with-openzeppelin).

Prerequisites:
-----

Before beginning, you need to get Connext credentials by loggin [here](https://app.connext.network/login). You must also create an account with a [mnemonic](https://iancoleman.io/bip39/) and populate it with [Rinkeby Ether](https://faucet.rinkeby.io/). How to are shown further below.

#### Truffle installed

1. `npm install -g truffle`

#### Infura Account (or your own Rinkeby node)

1. Sign up on [Infura](https://infura.io/signup)
2. You will get an email with your INFRUA_KEY


#### Setting up Connext

1. Register with Connext by directly emailing them at founders@connext[.]network
2. Go to the [Connext Login](https://app.connext.network) and get your API credentials
3. Create a user via the [Create Customer Endpoint](https://connextproject.github.io/slate/?javascript#customer) by making a POST API call with the users email. You get back a token vault (`${vault_address}`)
3. From the response you will receive a `${vault_address}`. This is the address you will send tokens to.
4. You can use the [check token balance](https://connextproject.github.io/slate/?javascript#get-token-balance) endpoint

#### Getting mnemonic key

1. Go to [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/)
2. Click the Generate button
3. Copy the generated BIP39 Mnemonic (`${mnemonic}`)
4. Under Coin, select "ETH - Ether" option
5. Keep the BIP44 tab, and scroll down to "Derived Addresses"
6. Save the first address of first item on the list. This is your public address (`${deploy_address}`)
7. Save the private key of the first item on the list. This is your private key (`${private_key}`)

#### Adding address to Metamask

1. Install Metamask [chrome extension](https://metamask.io/)
2. Once installed, Click Metamask icon
3. In the window click the person on the top right
4. Select Import Account
5. Copy the private from the previous section
6. Click import
7. Click Metamask Icon again
8. On the top right left, select the Rinkeby Network


#### Get Rinkeby Ether

1. Go to [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/)
2. Create a social media post that includes the public address that was generated.
3. Paste a link to the social media post and enter into input field
4. Click the "Give me Ether" butt on and Select the Ether amount

Setup:
-----

Once you have done all the prerequisites, you can setup this project and start working with Connext.

1. In the terminal: `git clone <repo>`
2. In the terminal: `cd <repo>`
3. In the terminal: `npm install`

Once everything is installed, you will need to configure `truffle.js` to work with rinkeby.

1. Open `truffle.js`
2. Enter your mnemonic (`${mnemonic}`) on line 2
3. Enter your Infura Key on line 3

Now you can deploy the contract to Rinkeby.

1. In the terminal: `truffle migrate --network rinkeby`
2. Once completed you need to get the address of your token. This can be grabbed from the `./build/contracts/ConnextExampleToken.json` file. The value at the key "networks.4.address" is the Rinkeby token address (`${token_address}`)

Before we continue, you need to send information to connext via email.

1. Merchant address (${deploy_address} from mnemonic)
2. List of token contract addresses (${token_address} )
3. list of destination addresses (${token_address} )
4. Address to receive charebacks (${token_address} )

You can send whatever address that best fits your DApp structure.

Finall, you can finally start the server and start moving tokens around.

1. In the terminal: `npm run dev`
2. Open the browser and go to `localhost:3000`
3. Enter token vault address `${vault_address}` you created for your user
4. Enter amount in Wie (`6000000000000000000`), for 6 tokens
5. Click Transfer
6. Accept transaction in Metamask widnow

Tutorial:
------

Once you have everything setup, will be able to send your tokens to any address. To work with Connext, you need to create a vault for your user. A `${vault_address}` is created for every unique email, so you can check if the user has a vault by calling the [find customer](https://connextproject.github.io/slate/?javascript#find-customer) endpoint. If it does not, and its likely that it does not, you will need to use the [create token](https://connextproject.github.io/slate/?javascript#create-customer) endpoint to create a vault. Once created, you send tokens to the `${vault_address}` via the website at `localhost:3000`.

Enter that value into the webpage and an amount of token to send in Wei. Metamask will pop up and click accept transaction. Once the transaction is completed, you will get an alert for the website. Check that the balance is correct by calling the [Check Token Balance](https://connextproject.github.io/slate/?javascript#get-token-balance) endpoint. If you followed the example from the previous section, you would see `6000000000000000000` (6 tokens in ether units). You can also check by going to the following endpoints on Etherscan. Replace values with the ones that you created.

1. Info for `${deploy_address}` : https://rinkeby.etherscan.io/address/<deploy_address>
2. All token balances for `${token_address}` : https://rinkeby.etherscan.io/token/<token_address>#balances
3. Token Balance for `${deploy_address}`: https://rinkeby.etherscan.io/token/<token_address>?a=<deploy_address>
4. Token Balance for `${vault_address}`: https://rinkeby.etherscan.io/token/<token_address>?a=<vault_address>

As a saftey check:

1. `${token_address}` should have `9994` tokens
2. `${vault_address}` should `6` token or `6000000000000000000` in Wei

You can transfer them back by calling the [transactVault](https://connextproject.github.io/slate/?javascript#transact-vault) function on the ${vault_address} solidity contract. The script in ./scripts/transactVault will allow you to move the tokens. Again, this is not an http api call, its a transaction sent to the Ethereum network.


In the project, you can configure the `transactVault.js` file with the values for your project.

1. from: address that deployed contract (`${deploy_address}`)
2. vaultAddress: Vault for the specified user (`${vault_address}`)
3. tokenContractAddress: Address of your token (`${token_address}`)
4. recipientAddress: Address who will get tokens (`${token_address}`)
5. amount: The amount of token to move in ether units. For example 0.5 ether (`500000000000000000` in Wei)

Once those are populated you enter `truffle exec ./scripts/transactVault.js --network rinkeby` into the terminal and you will receive a transaction (`${transfer_tx}`). From here you can enter the `${transfer_tx}` into Etherscan.

1. Token Address: https://rinkeby.etherscan.io/tx/<transfer_tx>

Once that transaction is completed you can recheck the Etherscan endpoints from before and see that the values are updated.

As a saftey check:

1. `${token_address}` should have `9994.5` tokens
2. `${vault_address}` should  `5.5` token or `500000000000000000` in Wei





