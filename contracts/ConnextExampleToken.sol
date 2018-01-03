pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract ConnextExampleToken is StandardToken {
    string public name = 'ConnextExampleToken';
    string public symbol = 'CET';
    uint8 public decimals = 18; // Currently only supports 18 decimals
    uint public INITIAL_SUPPLY = 10000 * (10 ** uint256(decimals));

    function ConnextExampleToken() public {
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

}