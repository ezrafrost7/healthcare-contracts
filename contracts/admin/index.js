/*
* Ezra Frost
* Admin node smart contract
*/

'use strict';

const AdminContract = require('./lib/admin-contract.js');

module.exports.AdminContract = AdminContract;
module.exports.contracts = [ AdminContract ];