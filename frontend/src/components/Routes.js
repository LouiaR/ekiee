import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages';
import Notfound from '../pages/notfound';
import Login from '../pages/login';
import Signup from '../pages/signup';

export default function Routes() {

  return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route exact path='/signin'>
				<Login />
			</Route>
			<Route exact path='/signup'>
				<Signup />
			</Route>
			<Route>
				<Notfound />
			</Route>
		</Switch>
	);
}
