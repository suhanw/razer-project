import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  showDeleteProfileDialog: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDeleteProfileDialog: (state, action) => {
      state.showDeleteProfileDialog =
        typeof action.payload !== "undefined"
          ? action.payload
          : !state.showDeleteProfileDialog;
    },
  },
});

export const uiReducer = uiSlice.reducer;

const { toggleDeleteProfileDialog } = uiSlice.actions;

/**
 * React hooks
 */

export const useToggleDeleteProfileDialog = function () {
  const dispatch = useDispatch();
  const showDeleteProfileDialog = useSelector(
    (state) => state.ui.showDeleteProfileDialog
  );
  return {
    toggleDeleteProfileDialog: (bool) => dispatch(toggleDeleteProfileDialog(bool)),
    showDeleteProfileDialog,
  };
};
