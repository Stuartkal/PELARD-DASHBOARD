import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './ReduxSaga';
import AdminReducer from './Reducers';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

//Create access to the store
export default () => {
	const sagaMiddleware = createSagaMiddleware();
	// const logger = createLogger();

	//Provide Middleware access to the store and devtools
	const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

	//Create the redux store
	const store = createStore(AdminReducer, middleware);

	//Run the sagas
	if (rootSaga) sagaMiddleware.run(rootSaga);

	return store;
};
