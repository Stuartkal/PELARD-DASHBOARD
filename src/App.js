import React from 'react';
import './App.css';
import Routes from './components/Routes/Routes';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
// import { Router, Switch, Route, Redirect } from 'react-router-dom';
// import LandingPage from './components/Layouts/LandingPage/LandingPage';
import storeCreator from './Store';
function App() {
	const store = storeCreator();

	return (
		<Provider store={store}>
			<Routes />
		</Provider>
	);
}

export default App;
