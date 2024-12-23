import { configureStore } from "@reduxjs/toolkit";

import { profileReducer } from "./profiles";
import { uiReducer } from "./ui";

export const store = configureStore({
  reducer: {
    profiles: profileReducer,
    ui: uiReducer,
  },
});

