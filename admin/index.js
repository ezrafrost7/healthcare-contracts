/*
* Ezra Frost
* Admin node smart contract
*/

'use strict';

const MyContract = require('./lib/admin-contract.js');

module.exports.MyContract = MyContract;
module.exports.contracts = [ MyContract ];