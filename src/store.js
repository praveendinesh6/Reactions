import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import { keyBy } from "lodash";

const initailState = {
  usersMap: {},
  reactionsMap: {},
  currentUserId: 20
};
const rootReducer = (state = initailState, action) => {
  switch (action.type) {
    case "FETCH_USERS_LIST":
      return {
        ...state,
        usersMap: keyBy(action.payload, "id"),
      };
    case "FETCH_REACTIONS_LIST":
      return {
        ...state,
        reactionsMap: keyBy(action.payload, "id"),
      };
    default:
      return state;
  }
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
export default store;
