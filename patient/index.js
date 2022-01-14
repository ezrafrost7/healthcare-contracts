/*
* Ezra Frost
* Patient node smart contract
*/

'use strict';

const PatientContract = require('./lib/patient-contract');

module.exports.PatientContract = PatientContract;
module.exports.contracts = [PatientContract];