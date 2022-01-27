import { formatEther } from "@ethersproject/units";

import chains from '../constants/chains';

export const formatCurrency = (value) => value ? parseFloat(formatEther(value)).toFixed(4) : '0.000';

export const formatAccount = (account) => account && `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`;

export const findChainById = (chainId) => {
  const chain = chains[chainId];
  console.log(chain);
  return chain || {};
  // return chains[chainId];
};
