import React from 'react';
import { useEthers } from "@usedapp/core";
import { ethers } from 'ethers';
import Web3Modal from "web3modal";
import WalletConnectProvider from '@walletconnect/web3-provider';

import { connectToInjected, connectToWalletConnect } from '../utils/web3connect';

export default function Home() {
  // hooks
  const { library } = useEthers();

  // functions
  const handleWe3ModalConnect = async () => {
    try {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            // test key - don't copy as your mileage may vary
            infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
          }
        },
      }; 
      // web3Modal support multiple providers/wallets
      const web3Modal = new Web3Modal({
        cacheProvider: false, // optional
        providerOptions, // required        
      });
      const connection = await web3Modal.connect();
      // Get providers
      const provider = new ethers.providers.Web3Provider(connection);
      console.log('provider:', provider);
      // reload the window
      window.location.reload();
    } catch(err) {
      console.log('connection error:', err);
    }
  };

  const handleMetamaskConnect = async () => {
    try {
      // get connection from injected
      const connection = await connectToInjected();
      // Get providers
      const provider = new ethers.providers.Web3Provider(connection);
      console.log('provider:', provider);
      // reload the window
      window.location.reload();
    } catch(e) {
      console.log('handleMetamaskConnect error:', e);
    }
  };

  const handleWallectConnect = async () => {
    try {
      // get connection from wallect connect
      const connection = await connectToWalletConnect(WalletConnectProvider, {
        infuraId: '8043bb2cf99347b1bfadfb233c5325c0',
      });
      // Get providers
      const provider = new ethers.providers.Web3Provider(connection);
      console.log('provider:', provider);
      // reload the window
      window.location.reload();
    } catch(e) {
      console.log('handleWallectConnect error:', e);
    }
  };

  // logs
  // library is an instance of ethers Web3Provider
  console.log('signer:', library && library.getSigner());
  
  // render out
  return (
    <div className="flex content-center items-center justify-center m-4">
      <div className="flex flex-row items-center justify-center space-x-4 p-4">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleWe3ModalConnect}
        >
          { library ? 'Connected ...' : 'Connect With Web3Modal' }
        </button>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleMetamaskConnect}
        >
          { library ? 'Connected ...' : 'Connect With MetaMask' }
        </button>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleWallectConnect}
        >
          { library ? 'Connected ...' : 'Connect With WalletConnect' }
        </button>
      </div>
    </div>
  )
}
