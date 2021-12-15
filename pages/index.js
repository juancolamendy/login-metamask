import React from 'react';
import { useEthers } from "@usedapp/core";

export default function Home() {
  // hooks
  const { library } = useEthers();

  // logs
  // library is an instance of ethers Web3Provider
  console.log('signer:', library && library.getSigner());
  
  // render out
  return (
    <div>
      Home Page
    </div>
  )
}
