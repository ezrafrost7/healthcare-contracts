#!/bin/bash

# Ezra Frost
# used for the creation of channels and adding organizations to those channels
# run this script from the project folder (healthcare-contracts)

# imports


#variables


#functions


#program

# generate crypto materials
cryptogen generate --config=./firstNetwork/network/crypto-config.yaml

#create file for block storage and initial blocks in chain
mkdir -p ../firstNetwork/network/config
configtxgen -profile OneOrgOrdererGenesis -outputBlock ./firstNetwork/network/config/genesis.block -channelID mychannel
configtxgen -profile OneOrgChannel -outputCreateChannelTx ./firstNetwork/network/config/channel.tx -channelID mychannel
configtxgen -profile OneOrgChannel -outputAnchorPeersUpdate ./firstNetwork/network/config/Org1MSPanchors.tx -channelID mychannel -asOrg Org1MSP

#running docker-compose file to create necessary containers
docker-compose -f ./firstNetwork/network/docker-compose.yml up -d ca.example.com orderer.example.com peer0.org1.example.com couchdb

