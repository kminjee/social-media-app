import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import reducer from "../reducer";
import rootSaga from "../saga";

const configureStore = (context) => {
  const sagaMiddlewere = createSagaMiddleware();
  const middlewares = [sagaMiddlewere];
  const enhancer = process.env.NODE_ENV === 'production' ? 
    compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
  
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddlewere.run(rootSaga);
  
  return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' });

export default wrapper;