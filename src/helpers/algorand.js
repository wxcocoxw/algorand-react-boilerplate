import algosdk from 'algosdk';
import { ALGOD_SERVER, ALGOD_TOKEN, ALGOD_PORT } from '../config/const';

export const algodClient = new algosdk.Algodv2(
    ALGOD_TOKEN,
    ALGOD_SERVER,
    ALGOD_PORT
  );

export const assetTransfer = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject;

