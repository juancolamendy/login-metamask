import React from 'react';

import Link from 'next/link';
import { useEthers } from "@usedapp/core";

import { ConnectButton } from '../components/ConnectButton/';
import { Button } from '../components/Button/';

const NavBar = () => {
  // hooks
  const { deactivate } = useEthers();

  // functions
  const handleDisconnect = () => {
    console.log('Disconnect');
    deactivate();
  };

  // render out
	return (
    <div className="flex justify-between items-center p-3 bg-gray-200 h-15">
      <Link href="/">
        Home
      </Link>
      <div>
        <Button label="Disconnect" onClick={handleDisconnect} />
      </div>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default NavBar;
