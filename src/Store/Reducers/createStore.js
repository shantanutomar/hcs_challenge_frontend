import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import thunkMiddleware from "redux-thunk";

/*
Redux Store creation
*/

const persistConfig = {
  key: "user",
  storage
};
var pReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(pReducer, applyMiddleware(thunkMiddleware));
  const persistor = persistStore(store);
  return { store, persistor };
};
