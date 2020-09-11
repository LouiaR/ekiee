import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages';
import Notfound from './pages/notfound';

export default function Routes() {
	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route exact>
				<Notfound />
			</Route>
		</Switch>
	);
}
