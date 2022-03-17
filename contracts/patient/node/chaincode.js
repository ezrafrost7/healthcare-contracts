/*
* Ezra Frost
* Patient node smart contract
*/

'use strict';

const { Contract } = require('fabric-contract-api');
const stringify  = require('json-stringify-deterministic');
const shim = require('fabric-shim');
const sortKeysRecursive = require('sort-keys-recursive');

class PatientContract extends Contract {
    //patient smart contract object 

    async Init(stub) {
        //initiate the patient's ledger
        var today = new Date();

        const data = {
                ProviderID: 'SystemAdmin',
                VisitDate: stringify(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()),
                TimeStamp: stringify(today.getHours() + ':' + today.getMinutes() + '.' + today.getSeconds()),
                Description: 'initiation of patient data',
                Notes: 'initiation of healthcare ledger'
            };

        try {
            data.docType = 'asset';
            await stub.putState(data.ProviderID, Buffer.from(stringify(sortKeysRecursive(data))));
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

    //AddRecord will be used to add patient visits and data to the ledger
    async AddRecord(stub, args) {
        
        //getting the date and time information
        var today = new Date();

        //getting the identity information (provider ID)
        let cid = new shim.ClientIdentity(stub);

        const data = {
            ProviderID: cid.getID(),
            VisitDate: stringify(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()),
            TimeStamp: stringify(today.getHours() + ':' + today.getMinutes() + '.' + today.getSeconds()),
            Description: args[0],
            Notes: args[1] 
        };

        //adding the data to the blockchain
        await stub.putState(data.ProviderID, Buffer.from(stringify(sortKeysRecursive(data))));
        
        console.info(stringify(sortKeysRecursive(data)))
    }

    //GetAllRecords returns all visitation records and their data
    async GetAllRecords(stub) {
        const allRecords = [];

        //sorting throught the blockchain and collecting each block/entry
        const iterator = await stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allRecords.push(record);
            result = await iterator.next();
        }

        return JSON.stringify(allRecords)

    }

}

shim.start(new PatientContract());