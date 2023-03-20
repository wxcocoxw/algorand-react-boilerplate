import algosdk from 'algosdk';

const baseServer = process.env.REACT_APP_ALGOD_SERVER;
const port = '443';
const token = ''

export const algodClient = new algosdk.Algodv2(
    token,
    baseServer,
    port
  );

export const assetTransfer = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject;

