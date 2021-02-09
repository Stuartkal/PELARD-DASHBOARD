import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import reducers from "./Reducers";
import rootSaga from "./ReduxSaga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//Create access to the store

const persistedReducer = persistReducer({ key: "root", storage }, reducers);

const sagaMiddleware = createSagaMiddleware();
// const logger = createLogger();

//Provide Middleware access to the store and devtools
const middleware = composeWithDevTools(applyMiddleware(sagaMiddleware));

//Create the redux store
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

//Run the sagas
sagaMiddleware.run(rootSaga);

export default {
  store,
  persistor,
};
