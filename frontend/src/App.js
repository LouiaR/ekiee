import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { AppContext } from './libs/context';

import './App.css';
import Layout from './components/Layout';
import Routes from './components/Routes';

function App() {
	const [isUserAuthenticated, userIsAuthenticated] = useState(false);
	const [signUser, setSignUser] = useState(true);
	useEffect(() => {
		const checkUser = async () => {
			try {
				await Auth.currentAuthenticatedUser();
				userIsAuthenticated(true);
				setSignUser(false);
			} catch (error) {
				setSignUser(true);
				userIsAuthenticated(false);
			}

		};
		checkUser();
	}, [isUserAuthenticated]);
	
	return (
		<AppContext.Provider value={{ isUserAuthenticated, userIsAuthenticated }}>
			<Layout>
				<Routes />
			</Layout>
		</AppContext.Provider>
	);
}

export default App;
