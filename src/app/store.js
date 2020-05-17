import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { batchDispatchMiddleware } from "redux-batched-actions";

// Root reducer & saga
import rootReducer from "./reducer";
import rootSaga from "./sagas";


// Create a history of your choosing (we"re using a browser history in this case)
export const history = createBrowserHistory();

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({
  // Log saga unhandled errors
  onError: (error) => console.error("Saga Error", error)
});

const middlewareList = [
  routerMiddleware(history),
  sagaMiddleware,
  batchDispatchMiddleware
];

// Build the middleware for intercepting and dispatching navigation actions
const middleware = applyMiddleware(...middlewareList);

// Add redux dev-tools
const storeEnhancers = composeWithDevTools(middleware);

const configureStore = () => {

  // Create store object
  const store = createStore(rootReducer(history), storeEnhancers);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./reducer", () => {
      console.log("Enabling Webpack HMR for reducers");
      store.replaceReducer(rootReducer(history));
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;