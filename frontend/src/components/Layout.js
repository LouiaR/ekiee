import React from 'react';

import Footer from './Footer';
import NavBar from './NavBar';

const Layout = ({ handleLogout, children }) => {
	return (
		<div>
			<NavBar handleLogout={handleLogout} />
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
