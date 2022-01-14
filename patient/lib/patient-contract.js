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

    async InitPatient(context) {
        //initiate the patient's ledger
        var today = new Date()

        const data = [
            {
                ProviderID: 'admin',
                VisitDate: stringify(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()),
                Description: 'initiation of patient data',
                Notes: 'initiation of healthcare ledger'
            }
        ];

        for (const datum of data) {
            datum.docType = 'asset';
            await context.stub.putState(datum.ProviderID, Buffer.from(stringify(sortKeysRecursive(datum))))
        }
    }

}

module.exports = PatientContract;