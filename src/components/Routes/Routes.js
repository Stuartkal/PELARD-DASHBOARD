import React from 'react';
import PageRoutes from './PageRoutes';

// import { createBrowserHistory } from 'history';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

// const history = createBrowserHistory();
const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>{PageRoutes.map((route) => <Route {...route} key={Math.random()} />)}</Switch>
		</BrowserRouter>
	);
};

export default Routes;
