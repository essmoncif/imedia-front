import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { RootReducer } from "./reducers/Root";

export const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);