import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const profiles = [
  { id: "default", type: "default", name: "Default" },
  { id: "game", type: "game", name: "Game" },
  { id: "movie", type: "movie", name: "Movie" },
  { id: "music", type: "music", name: "Music" },
  { id: "custom-1", type: "custom", name: "Custom 1" },
  { id: "custom-2", type: "custom", name: "Custom 1" },
  { id: "custom-3", type: "custom", name: "Custom 1" },
  { id: "custom-4", type: "custom", name: "Custom 1" },
  {
    id: "demo",
    type: "custom",
    name: "Demo Long text Demo Long text Demo Long text Demo Long text Demo Long text ",
  },
];

const initialState = {
  allProfiles: profiles,
  selectedProfileId: "default",
};

const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    getAllProfilesSuccess: (state, action) => {
      state.allProfiles = action.payload;
    },
    setSelectedProfileId: (state, action) => {
      state.selectedProfileId = action.payload;
    },
  },
});

export const { getAllProfilesSuccess, setSelectedProfileId } =
  profileSlice.actions;

export const profileReducer = profileSlice.reducer;

export const useGetAllProfiles = function () {
  const allProfiles = useSelector((state) => state.profiles.allProfiles);
  return { allProfiles };
};

export const useGetSelectedProfile = function () {
  const selectedProfile = useSelector(
    (state) => state.profiles.selectedProfile
  );
  return { selectedProfile };
};

export const useSetSelectedProfileId = function () {
  const selectedProfileId = useSelector(
    (state) => state.profiles.selectedProfileId
  );
  const dispatch = useDispatch();
  return {
    selectedProfileId,
    setSelectedProfileId: (profileId) =>
      dispatch(setSelectedProfileId(profileId)),
  };
};
