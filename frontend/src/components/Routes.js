import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages';
import Signup from '../pages/signup';
import Signin from '../pages/login';
import NotFound from '../pages/notfound';

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route exact path='/signup'>
				<Signup />
			</Route>
			<Route exact path='/signin'>
				<Signin />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
};

export default Routes;
