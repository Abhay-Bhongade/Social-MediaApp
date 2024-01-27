import getUserProfilesDataReducer from "../features/User/getUserProfilesDataSlice"
import getFriendRequestListReducer from "../features/FrinedRequest/getFriendRequestListSlice"

import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["", ""],
};

const reducer = combineReducers({

  getUserProfilesData: getUserProfilesDataReducer,
  getFriendRequestList:getFriendRequestListReducer,

});

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
