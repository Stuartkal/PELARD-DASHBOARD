import React from 'react';
import './App.css';
import Routes from '../src/Components/Routes/Routes';
import { Provider } from 'react-redux';

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
