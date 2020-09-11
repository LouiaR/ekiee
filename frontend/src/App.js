import React from 'react';
// import { Auth } from 'aws-amplify';

import './App.css';
import Layout from './components/Layout';
import Routes from './components/Routes';

function App() {
	return (
		<>
			<Layout>
				<Routes />
			</Layout>
		</>
	);
}

export default App;
