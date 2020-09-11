import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages';
import Notfound from '../pages/notfound';
import Login from '../pages/Login';

export default function Routes() {

  return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route exact path='/signin'>
				<Login />
			</Route>
			<Route>
				<Notfound />
			</Route>
		</Switch>
	);
}
