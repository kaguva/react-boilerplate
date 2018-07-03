import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import routes from '../config/routes';
import reducers from './reducers';

function createStore(history, preloadedState = {}) {
  // enhancers
  let composeEnhancers = compose;

  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-underscore-dangle
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  // middlewares
  const routeMiddleware = routerMiddleware(history);
  const middlewares = [
    routeMiddleware,
    reduxThunk,
  ];

  const store = createReduxStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  return {
    store,
    history,
    routes,
  };
}

export default createStore;
