/*
* Ezra Frost
* Admin node smart contract
*/

'use strict';

const {Contract} = require('fabric-contract-api');
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');

//Standard class, instantiation for creation of smart contract
class AdminContract extends Contract {
    //methods for the smart contract go here

    async InitLedger(ctx) {
        //initiate the admin ledger



    }

}

module.exports = AdminContract