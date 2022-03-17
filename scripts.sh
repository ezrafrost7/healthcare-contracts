#!/bin/bash
# Created by Ezra Frost for the creation of blockchain networks
# utilizes the Minifab tool and the Hyperledger Fabric
# these scripts must be run in the application's root directory
function adminUp() {
    # brings up the admin org for the administration of the network
    export PATH=${PWD}/minifab:${PATH}
    cd ./admin && minifab netup -e 7100 -o org0.admin.com -i 2.2 -l node -s couchdb
    # admin channel creatation and installing chaincode to the channel
    minifab create,join -c admin1
    cp -r ../contracts/admin ./vars/chaincode
    minifab install,approve,commit -n admin -l node -v 1.0 -p '"Init"'
    # end in the same dir that you started
    cd ../
}

function adminDown(){
    # brings down and tears down the admin network
    export PATH=${PWD}/minifab:${PATH}
    cd ./org1 && minifab down,cleanup
    cd ../admin && minifab down,cleanup
}