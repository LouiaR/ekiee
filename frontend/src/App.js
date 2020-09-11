import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import Routes from './components/Routes';
import { UserContext } from './components/libs/userContext';

function App() {
	const [isUserAuth, setIsUserAuth] = useState(false);
	const [userHasSignIn, setUserHasSignIn] = useState(true);
	const history = useHistory();

	const handleLogout = async () => {
		await Auth.signOut();
		setIsUserAuth(false);
		history.push('/signin');
	};

	useEffect(() => {
		const onLoad = async () => {
			try {
				await Auth.currentSession();
				setIsUserAuth(true);
			} catch (error) {
				// alert(error);
				console.log(error);
			}
			setUserHasSignIn(false);
		};
		onLoad();
	}, []);

	return (
		<UserContext.Provider value={{ isUserAuth, setIsUserAuth }}>
			<Layout handleLogout={handleLogout}>
				<div className='container'>
					<Routes />
				</div>
			</Layout>
		</UserContext.Provider>
	);
}

export default App;
