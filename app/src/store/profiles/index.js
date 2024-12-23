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
