import React, { useEffect } from 'react';
import { useEthers } from "@usedapp/core";
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';

import { getItem, setItem } from '../utils/storage';
import { connectToInjected, connectToWalletConnect } from '../utils/web3connect';
import { signMessage, getAuthKey } from '../utils/auth';
import { globals } from '../utils/constants';

const doSignature = async connection => {
  const key = getAuthKey('swc');
  const item = getItem(key);
  const provider = new ethers.providers.Web3Provider(connection);
  const accounts = await provider.listAccounts();
  console.log('accounts:', accounts);
  if(!item || (item.authData && accounts.length > 0 && item.authData.address!==accounts[0])) {
    console.log('sign a new message - key:', key);
    const sig = await signMessage({message: globals.signatureMessage, connection: provider});
    if(sig.success) {
      console.log('saving authData- key:', key);
      setItem(key, {
        authData: {
          'message': sig.message,
          'address': sig.address,
          'signature': sig.signature,
        }
      })
    }
  }   
};

export default function Home() {
  // hooks
  const { account, activate } = useEthers();

  useEffect(() => {
   const checkConnection = async () => {
     console.log('window.ethereum:', window.ethereum);
     if(!window.ethereum) {
       await handleWallectConnect();
     } else {
       await handleMetamaskConnect();
     }
   };
   checkConnection();
  }, []);

  const handleMetamaskConnect = async () => {
    console.log('--- execute handleMetamaskConnect');
    try {
      // get connection from injected
      const connection = await connectToInjected();
      await activate(connection);
      await doSignature(connection);
    } catch(e) {
      console.log('handleMetamaskConnect error:', e);
    }
  };

  const handleWallectConnect = async () => {
    console.log('--- execute handleWallectConnect');
    try {
      // get connection from wallect connect
      const connection = await connectToWalletConnect(WalletConnectProvider, {
        bridge: 'https://bridge.walletconnect.org',
        infuraId: 'b81e3dcbe77441e8a80b56961e5b7dd9',
      });
      await activate(connection);
      await doSignature(connection);
    } catch(e) {
      console.log('handleWallectConnect error:', e);
    }
  };

  // logs
  // console.log('signer:', connection && connection.getSigner());
  console.log('--- account info:', account);
  
  // render out
  return (
    <div className="flex content-center items-center justify-center m-4">
      <div className="flex flex-row items-center justify-center space-x-4 p-4">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleMetamaskConnect}
        >
          { account ? 'Connected ...' : 'Connect With MetaMask' }
        </button>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleWallectConnect}
        >
          { account ? 'Connected ...' : 'Connect With WalletConnect' }
        </button>
      </div>
    </div>
  )
}
