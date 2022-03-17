/*
* Ezra Frost
* Admin node smart contract
*/

'use strict';

const {Contract} = require('fabric-contract-api');
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const fs = require('fs');
const shim = require('fabric-shim');

//Standard class, instantiation for creation of smart contract
class AdminContract extends Contract {
    //methods for the smart contract go here

    async Init(stub) {
        //initiate the admin ledger

        const asset = {
            ID: 'init0',
            Name: 'Ledger Initiated'
        }

        try {
            await stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
            return shim.success();
        } catch (err) {
            return shim.error(err);
        }
    }

    async Invoke(stub) {
        //required for chaincode initiation
        let ret = stub.getFunctionAndParameters();
        console.info(ret);
        let method = this[ret.fcn];
        if (!method) {
        console.log('no method of name:' + ret.fcn + ' found');
        return shim.success();
        }
        try {
        let payload = await method(stub, ret.params);
        return shim.success(payload);
        } catch (err) {
        console.log(err);
        return shim.error(err);
        }
    }

    async NewPatientChannel(stub, args) {
        //logging patient channel details

        let patientID=args[0];
        let channelName=args[1];
        
        const asset = {
            ID: patientID,
            Name: channelName
        }

        try {
            await stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
            return shim.success();
        } catch (err) {
            return shim.error(err);
        }
    }

}

shim.start(new AdminContract());