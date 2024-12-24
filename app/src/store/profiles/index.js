import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import {
  getProfilesFromCache,
  cacheProfiles,
  getSelectedProfileIdFromCache,
  cacheSelectedProfileId,
} from "cache/profiles";

const initialState = {
  allProfiles: getProfilesFromCache(),
  selectedProfileId: getSelectedProfileIdFromCache(),
};

const profileSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setSelectedProfileId: (state, action) => {
      state.selectedProfileId = action.payload;
      cacheSelectedProfileId(state.selectedProfileId);
    },
    getAllProfilesSuccess: (state, action) => {
      state.allProfiles = action.payload;
      cacheProfiles(state.allProfiles);
    },
    createProfileSuccess: (state, action) => {
      state.allProfiles = [...state.allProfiles, action.payload];
      cacheProfiles(state.allProfiles);
    },
    deleteProfileSuccess: (state, action) => {
      state.allProfiles = state.allProfiles.filter(
        ({ id }) => id !== action.payload
      );
      cacheProfiles(state.allProfiles);
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

export const useUpdateSelectedProfile = function () {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(
    (state) => state.profiles.selectedProfileId
  );
  const allProfiles = useSelector((state) => state.profiles.allProfiles);
  const selectedIndex = allProfiles.findIndex(
    ({ id }) => id === selectedProfileId
  );
  return {
    updateSelectedProfile: (updatedProfile) => {
      const updatedProfiles = [...allProfiles];
      updatedProfiles[selectedIndex] = updatedProfile;
      dispatch(getAllProfilesSuccess(updatedProfiles));
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
