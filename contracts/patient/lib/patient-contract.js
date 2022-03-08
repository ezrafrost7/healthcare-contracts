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

    async InitLedger(context) {
        //initiate the patient's ledger
        var today = new Date();

        const data = [
            {
                ProviderID: 'SystemAdmin',
                VisitDate: stringify(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()),
                TimeStamp: stringify(today.getHours() + ':' + today.getMinutes() + '.' + today.getSeconds()),
                Description: 'initiation of patient data',
                Notes: 'initiation of healthcare ledger'
            }
        ];

        for (const dat of data) {
            dat.docType = 'asset';
            await context.stub.putState(dat.ProviderID, Buffer.from(stringify(sortKeysRecursive(dat))));
        }

        return ('Patient Chain Data Initiated')
    }

    //AddRecord will be used to add patient visits and data to the ledger
    async AddRecord(context, description, notes) {
        
        //getting the date and time information
        var today = new Date();

        //getting the identity information (provider ID)
        let cid = new shim.ClientIdentity(context.stub);

        const data = {
            ProviderID: cid.getID(),
            VisitDate: stringify(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()),
            TimeStamp: stringify(today.getHours() + ':' + today.getMinutes() + '.' + today.getSeconds()),
            Description: description,
            Notes: notes 
        };

        //adding the data to the blockchain
        await context.stub.putState(data.ProviderID, Buffer.from(stringify(sortKeysRecursive(data))));
        return JSON.stringify(data)
    }

    //GetAllRecords returns all visitation records and their data
    async GetAllRecords(context) {
        const allRecords = [];

        //sorting throught the blockchain and collecting each block/entry
        const iterator = await context.stub.getStateByRange('', '');
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

module.exports = PatientContract;