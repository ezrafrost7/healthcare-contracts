/*
* Ezra Frost
* Admin node smart contract
*/

'use strict';

const {Contract} = require('fabric-contract-api');
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const fs = require('fs');
const {exec} = require('child_process');

//Standard class, instantiation for creation of smart contract
class AdminContract extends Contract {
    //methods for the smart contract go here

    async Init(ctx) {
        //initiate the admin ledger

        const asset = {
            ID: 'init0',
            Name: 'Ledger Initiated'

        }

        await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))))

    }

    async NewPatientChannel(ctx, name) {
        //creating a patient channel

        const asset = {
            ID: name
        }
    }

}

module.exports = AdminContract