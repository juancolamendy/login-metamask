import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar';

const MainLayout = ({children}) => {
	return (
	<div className="flex flex-col w-screen h-screen bg-gray-200">
		<NavBar />
		<div className="flex-auto bg-gray-100 border rounded-tl-xl shadow p-3">
			{children}
		</div>		
	</div>
	);
};

MainLayout.propTypes = {
	children: PropTypes.node,
};

export default MainLayout;
