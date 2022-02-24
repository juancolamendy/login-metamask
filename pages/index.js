import React, { useEffect } from 'react';
import { useEthers } from "@usedapp/core";

import { globals } from '../utils/constants';

import { doConnect } from '../utils/web3auth';

export default function Home() {
  // hooks
  const { account, activate, deactivate } = useEthers();

  // logs
  // console.log('signer:', connection && connection.getSigner());
  console.log('--- account info:', account);
  
  // functions
  const handleConnect = (e) => {
    e.preventDefault();
    
    // doConnect
    doConnect( globals.getConfig({activate, deactivate}) );
  };
  
  // render out
  return (
    <div className="flex content-center items-center justify-center m-4">
      <div className="flex flex-row items-center justify-center space-x-4 p-4">
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleConnect}
        >
          { account ? 'Connected ...' : 'Connect' }
        </button>
      </div>
    </div>
  )
}
