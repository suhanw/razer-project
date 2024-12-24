import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

// 9. Profile data array would be something like this [{name: 'Default', ...}, {name: 'Game', ...}] but you are given the freedom on what other properties it should have to implement the requirements.
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
    createProfileSuccess: (state, action) => {
      state.allProfiles = [...state.allProfiles, action.payload];
    },
    deleteProfileSuccess: (state, action) => {
      state.allProfiles = state.allProfiles.filter(
        ({ id }) => id !== action.payload
      );
    },
  },
});

export const profileReducer = profileSlice.reducer;

const {
  getAllProfilesSuccess,
  setSelectedProfileId,
  createProfileSuccess,
  deleteProfileSuccess,
} = profileSlice.actions;

/**
 * React hooks to expose state data and update methods
 */

export const useGetAllProfiles = function () {
  const allProfiles = useSelector((state) => state.profiles.allProfiles);
  return { allProfiles };
};

export const useGetSelectedProfile = function () {
  const selectedProfileId = useSelector(
    (state) => state.profiles.selectedProfileId
  );
  const allProfiles = useSelector((state) => state.profiles.allProfiles);
  const selectedProfile = allProfiles.find(
    ({ id }) => id === selectedProfileId
  );

  return { selectedProfileId, selectedProfile };
};

export const useSetSelectedProfileId = function () {
  const dispatch = useDispatch();
  return {
    setSelectedProfileId: (profileId) =>
      dispatch(setSelectedProfileId(profileId)),
  };
};

export const useUpdateProfileOrder = function () {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(
    (state) => state.profiles.selectedProfileId
  );
  const allProfiles = useSelector((state) => state.profiles.allProfiles);

  const firstProfileSelected = allProfiles[0]?.id === selectedProfileId;
  const lastProfileSelected =
    allProfiles[allProfiles.length - 1]?.id === selectedProfileId;

  const selectedIndex = allProfiles.findIndex(
    ({ id }) => id === selectedProfileId
  );

  const moveProfileUp = function () {
    if (firstProfileSelected) return;

    const selectedProfile = allProfiles[selectedIndex];
    const previousProfile = allProfiles[selectedIndex - 1];

    const updatedProfiles = [...allProfiles];
    updatedProfiles[selectedIndex - 1] = selectedProfile;
    updatedProfiles[selectedIndex] = previousProfile;

    dispatch(getAllProfilesSuccess(updatedProfiles));
  };

  const moveProfileDown = function () {
    if (lastProfileSelected) return;

    const selectedProfile = allProfiles[selectedIndex];
    const nextProfile = allProfiles[selectedIndex + 1];

    const updatedProfiles = [...allProfiles];
    updatedProfiles[selectedIndex + 1] = selectedProfile;
    updatedProfiles[selectedIndex] = nextProfile;

    dispatch(getAllProfilesSuccess(updatedProfiles));
  };

  return {
    firstProfileSelected,
    lastProfileSelected,
    moveProfileUp,
    moveProfileDown,
  };
};

export const useCreateProfile = function () {
  const dispatch = useDispatch();
  return {
    createProfile: (
      callback,
      profile = {
        id: `custom-${Date.now()}`,
        type: "custom",
        name: "New Profile",
      }
    ) => {
      dispatch(createProfileSuccess(profile));
      dispatch(setSelectedProfileId(profile.id));
      callback?.(profile.id);
    },
  };
};

export const useDeleteSelectedProfile = function () {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(
    (state) => state.profiles.selectedProfileId
  );
  const allProfiles = useSelector((state) => state.profiles.allProfiles);
  const selectedIndex = allProfiles.findIndex(
    ({ id }) => id === selectedProfileId
  );
  const alternativeIndex = selectedIndex > 0 ? selectedIndex - 1 : 1;
  const alternativeProfile = allProfiles[alternativeIndex];
  return {
    deleteSelectedProfile: () => {
      // 6. If a selected profile is deleted, it should automatically select the profile above the deleted profile.
      dispatch(setSelectedProfileId(alternativeProfile.id));
      dispatch(deleteProfileSuccess(selectedProfileId));
    },
  };
};
