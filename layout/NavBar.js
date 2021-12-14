import React from 'react';

import Link from 'next/link';

import { ConnectButton } from '../components/ConnectButton/';

const NavBar = () => {
	return (
    <div className="flex justify-between items-center p-3 bg-gray-200 h-15">
      <Link href="/">
        Home
      </Link>
      <div>
        <ConnectButton />
      </div>
    </div>
  );
};

export default NavBar;
