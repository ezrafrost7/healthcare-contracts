#!/bin/bash

# Ezra Frost
# used for the creation of channels and adding organizations to those channels
# run this script from the project folder (healthcare-contracts)

# imports


#variables


#functions


#program

# generate crypto materials
#set -x
cryptogen generate --config=./crypto-config.yaml --output=crypto-config;
#set +x

#create file for block storage and initial blocks in chain
mkdir config;
configtxgen -profile OneOrgOrdererGenesis -outputBlock config/genesis.block -channelID mychannel;
configtxgen -profile OneOrgChannel -outputCreateChannelTx config/channel.tx -channelID mychannel;
configtxgen -profile OneOrgChannel -outputAnchorPeersUpdate config/Org1MSPanchors.tx -channelID mychannel -asOrg Org1MSP;

#running docker-compose file to create necessary containers
docker-compose -f ./docker-compose.yml up -d ca.example.com orderer.example.com peer0.org1.example.com couchdb