import React, { useRef, useState, useEffect } from "react";
import cn from "classnames";

import style from "./style";
import {
  useGetAllProfiles,
  useGetSelectedProfile,
  useSetSelectedProfileId,
  useUpdateProfileOrder,
  useCreateProfile,
  useUpdateSelectedProfile,
} from "store/profiles";
import { useToggleDeleteProfileDialog } from "store/ui";

// 2. Clicking a profile should select the profile and will be highlighted in green and the right panel will be updated.
// 3. Move up, move down, and add (+) icon are always shown. If the selected profile is at the most top of the list, move up will be disabled. Same goes if the selected profile is at the most bottom of the list, move down will be disabled.
// 4. User has 4 default profiles: Default, Game, Movie and Music. Default profiles have their own icons, can be moved up and down, but cannot be renamed or deleted. Hence delete and rename icon should not be shown on the UI if the selected profile is a default profile.
// 5. User can choose to add a custom profile by clicking the add (+) icon. Custom profile should be named "New Profile", added to the last of the list and should be automatically selected.
// 7. Rename should be trimmed and do not allow just an empty space for the name.

function ProfileList() {
  const { allProfiles } = useGetAllProfiles();
  const { selectedProfile } = useGetSelectedProfile();
  const [editMode, setEditMode] = useState(false);

  return (
    <nav className={style.layout}>
      <h2 className={style.title}>PROFILE LIST</h2>

      <div className={style.profileWrapper}>
        <ul className={style.profileList}>
          {allProfiles.map(({ type, id, name }) => (
            <ProfileListItem
              key={id}
              id={id}
              type={type}
              name={name}
              isSelected={id === selectedProfile.id}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          ))}
        </ul>

        <ProfileListToolbar
          profileType={selectedProfile.type}
          setEditMode={setEditMode}
        />
      </div>
    </nav>
  );
}

function ProfileListItem({ isSelected, editMode, setEditMode, ...profile }) {
  const { id, type, name } = profile;
  const [profileName, setProfileName] = useState(name);
  const { setSelectedProfileId } = useSetSelectedProfileId();
  const { updateSelectedProfile } = useUpdateSelectedProfile();
  const inputRef = useRef();

  useEffect(() => {
    if (isSelected && editMode) {
      inputRef.current?.select();
    }
  }, [isSelected && editMode]);

  useEffect(() => {
    if (profileName && name !== profileName) {
      updateSelectedProfile({
        ...profile,
        name: profileName,
      });
    }
  }, [profileName]);

  const disableEditMode = () => setEditMode(false);

  if (isSelected && editMode) {
    return (
      <li id={id}>
        <form
          onSubmit={disableEditMode}
          className={cn(style.profileListItem, style[type])}
        >
          <input
            className={style.profileEditMode}
            ref={inputRef}
            type="text"
            value={profileName}
            placeholder="Enter Profile Name"
            onChange={(e) => setProfileName(e.target.value)}
            onBlur={disableEditMode}
          />
          <button type="submit" />
        </form>
      </li>
    );
  }

  return (
    <li id={id}>
      <button
        className={cn(style.profileListItem, style[type], {
          [style.selected]: isSelected,
        })}
        onClick={() => setSelectedProfileId(id)}
      >
        <span className={style.profileName}>{name}</span>
      </button>
    </li>
  );
}

function ProfileListToolbar({ profileType, setEditMode }) {
  const {
    firstProfileSelected,
    lastProfileSelected,
    moveProfileUp,
    moveProfileDown,
  } = useUpdateProfileOrder();
  const { createProfile } = useCreateProfile();
  const { toggleDeleteProfileDialog } = useToggleDeleteProfileDialog();

  return (
    <menu className={style.profileListToolbar}>
      <div className={style.reorderIcons}>
        <button
          className={cn(style.toolbarIcon, {
            [style.disabled]: firstProfileSelected,
          })}
          style={{ backgroundImage: "url(/images/icon_arrow_up.svg)" }}
          onClick={moveProfileUp}
        />
        <button
          className={cn(style.toolbarIcon, {
            [style.disabled]: lastProfileSelected,
          })}
          style={{ backgroundImage: "url(/images/icon_arrow_down.svg)" }}
          onClick={moveProfileDown}
        />
      </div>
      <div className={style.crudIcons}>
        {profileType === "custom" && (
          <>
            <button
              className={style.toolbarIcon}
              style={{ backgroundImage: "url(/images/icon_delete.svg)" }}
              onClick={() => toggleDeleteProfileDialog()}
            />
            <button
              className={style.toolbarIcon}
              style={{ backgroundImage: "url(/images/icon_edit.svg)" }}
              onClick={() => setEditMode((editMode) => !editMode)}
            />
          </>
        )}
        <button
          className={style.toolbarIcon}
          style={{ backgroundImage: "url(/images/icon_plus.svg)" }}
          onClick={() =>
            createProfile((profileId) => {
              setTimeout(() => {
                document.querySelector(`#${profileId}`)?.scrollIntoView?.({
                  behavior: "smooth",
                });
              });
            })
          }
        />
      </div>
    </menu>
  );
}

export default ProfileList;
