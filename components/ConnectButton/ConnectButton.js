import React from 'react';
import PropTypes from 'prop-types';

import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

const formatCurrency = (value) => value ? parseFloat(formatEther(value)).toFixed(4) : '0.000';

const formatAccount = (account) => account && `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`

const ConnectButton = ({label}) => {
  // hooks
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  // functions
  const handleConnect = () => {
    activateBrowserWallet();
  };

  // logs
  console.log('account, chainId, balance', account, chainId, etherBalance);
  
  // render out
  return (
  <div className="w-full text-sm leading-4 font-medium text-green-900">
    { account ? (
      <span>{`${formatCurrency(etherBalance)} ETH - ${formatAccount(account)}`}</span>
    ) : (
      <button type="button" 
        onClick={handleConnect}
        className="flex content-center items-center justify-center text-center px-3 py-2 border border-gray-200 shadow-sm rounded-md bg-white bg-opacity-10 border-opacity-10 hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 w-full">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 text-purple-500 ">
          <path d="M5.75 10L12 4.75L18.25 10M5.75 10L12 19.25L18.25 10M5.75 10L12 12.25L18.25 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        <span>{label}</span>
      </button>
    )}
  </div>
  );
};

ConnectButton.propTypes = {
  label: PropTypes.string,
};

ConnectButton.defaultProps = {
  label: 'Connect to Wallet',
};

export default ConnectButton;
