#!/bin/bash
# Created by Ezra Frost for the creation of blockchain networks
# utilizes the Minifab tool and the Hyperledger Fabric
# these scripts must be run in the application's root directory
adminUp() {
    # brings up the admin org for the administration of the network
    export PATH=${PWD}/minifab:${PATH}
    cd ./admin && minifab netup -e 7100 -o org0.admin.com -i 2.2 -l node -s couchdb
    # admin channel creatation and installing chaincode to the channel
    minifab create,join -c admin1
    cp -r ../contracts/admin ./vars/chaincode
    minifab install,approve,commit -n admin -l node -v 1.0 -p '"Init"'
    minifab initialize
    # end in the same dir that you started
    cd ../
}

adminDown() {
    # brings down and tears down the admin network
    export PATH=${PWD}/minifab:${PATH}
    cd ./org1 && minifab down,cleanup
    cd ../admin && minifab down,cleanup
    cd ../
}

providerUp() {
    # brings up a provider on the test network and adds them to the admin channel
    local providerName="${1}"
    export PATH=${PWD}/minifab:${PATH}
    cd ${providerName} && minifab netup -e 7200 -o "${providerName}.provider.com" -i 2.2 -l node -s couchdb
    # adding the provider to the admin channel
    cd ../admin
    cp ../${providerName}/vars/JoinRequest_${providerName}-provider-com.json ./vars/NewOrgJoinRequest.json
    # if you run discover after the command below there are no endorser endpoints in either org
    # this is causing problems later on because there are no endorsers
    minifab orgjoin,profilegen -c admin1
    cd ../${providerName}
    cp ../admin/vars/profiles/endpoints.yaml vars
    # copy over admin1.genesis.block
    minifab nodeimport,join -c admin1
    cp -r ../contracts/admin ./vars/chaincode
    minifab install,approve -n admin -v 1.0 -p '"Init"' -c admin1
    cd ../admin
    minifab approve,commit
    # end in the same dir that you started
    cd ../
}

addProvider() {
    # adds a provider to a patient network
    # currently written for a local network only
    export PATH=${PWD}/minifab:${PATH}
    local providerName="${1}"
    local patientName="${2}"

}

createPatient() {
    # creates a new patient channel and ledger for a provider
    local patientName="${1}"
    local 
}