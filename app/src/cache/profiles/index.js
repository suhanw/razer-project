// 9. Profile data array would be something like this [{name: 'Default', ...}, {name: 'Game', ...}] but you are given the freedom on what other properties it should have to implement the requirements.
// 8. Any changes by the user should be saved in the LocalStorage. If no data is stored in the LocalStorage, populate it with the 4 default profiles in the following order: Default, Game, Movie and Music. Selected profile should be "Default".

const DEFAULT_PROFILES = [
  { id: "default", type: "default", name: "Default" },
  { id: "game", type: "game", name: "Game" },
  { id: "movie", type: "movie", name: "Movie" },
  { id: "music", type: "music", name: "Music" },
];

const DEFAULT_SELECTED_PROFILE_ID = "default";

export const getProfilesFromCache = function () {
  let profiles;
  try {
    profiles = JSON.parse(localStorage.getItem("profiles"));

    if (!profiles?.length) {
      profiles = DEFAULT_PROFILES;
      cacheProfiles(profiles);
    }
  } catch (error) {
    console.error(error);
    profiles = DEFAULT_PROFILES;
  }
  return profiles;
};

export const getSelectedProfileIdFromCache = function () {
  let selectedProfileId = localStorage.getItem("selectedProfileId");
  if (!selectedProfileId) {
    selectedProfileId = DEFAULT_SELECTED_PROFILE_ID;
    cacheSelectedProfileId(selectedProfileId);
  }
  return selectedProfileId;
};

export const cacheProfiles = function (profiles) {
  localStorage.setItem("profiles", JSON.stringify(profiles));
};

export const cacheSelectedProfileId = function (profileId) {
  localStorage.setItem("selectedProfileId", profileId);
};
