import { combineReducers, configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./tasks.slice";

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
