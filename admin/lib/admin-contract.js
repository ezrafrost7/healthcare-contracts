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

    async InitLedger(ctx) {
        //initiate the admin ledger

        await ctx.stub.putState("init", "Admin ledger initiated")

    }

    async CreateChannel(ctx, CHANNEL_NAME) {
        //creating a patient channel

        const channelArtifacts = './channelArtifacts';

        if (!fs.existsSync(channelArtifacts)) {
            fs.mkdirSync(channelArtifacts)
        }

        exec(`configtxgen -profile TwoOrgsApplicationGenesis -outputBlock ./channel-artifacts/${CHANNEL_NAME}.block -channelID ${CHANNEL_NAME}`, (err,stdout,stderr) => {

        if (err) {
            console.error(err);
            return;
        } if (stderr) {
            console.error(stderr);
            return;
        }

        console.log(stdout);
        //await ctx.stub.putState(stringify(stdout), Buffer.from(stringify(stdout)))
        return JSON.stringify(stdout);

    });

    }

}

module.exports = AdminContract