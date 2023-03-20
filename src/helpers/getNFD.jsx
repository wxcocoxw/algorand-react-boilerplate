import axios from 'axios';
import { truncateAddress } from './conversions';

// Get NFD from Active Account Wallet Address
export const getNFD = async walletAddress => {
  try {
    const response = await axios.get(
      `https://api.nf.domains/nfd/v2/address?address=${walletAddress}&limit=1&view=thumbnail`
    );

    const data = response.data;

    const firstAddress = Object.keys(data)[0];

    const caAlgo = data[firstAddress][0].caAlgo[0];
    const name = data[firstAddress][0].name;

    if (caAlgo === walletAddress) {
      return name;
    }
  } catch (error) {
    console.log(error);
    return truncateAddress(walletAddress);
  }
};
