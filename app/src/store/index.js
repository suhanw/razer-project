import { configureStore } from "@reduxjs/toolkit";

import { profileReducer } from "./profiles"; 

export const store = configureStore({
  reducer: {
    profiles: profileReducer,
  },
});

