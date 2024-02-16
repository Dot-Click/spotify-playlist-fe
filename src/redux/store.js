import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers
import { authReducer } from "./reducers/authReducer";
import { spotifyReducer } from "./reducers/spotifyReducer";

const reducer = combineReducers({
  auth: authReducer,
  spotify: spotifyReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  // applyMiddleware(...middleware)
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
