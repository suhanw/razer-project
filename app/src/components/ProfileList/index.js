import React from "react";
import cn from "classnames";

import style from "./style";
import {
  useGetAllProfiles,
  useGetSelectedProfile,
  useSetSelectedProfileId,
  useUpdateProfileOrder,
  useCreateProfile,
} from "store/profiles";
import { useToggleDeleteProfileDialog } from "store/ui";

// 2. Clicking a profile should select the profile and will be highlighted in green and the right panel will be updated.
// 3. Move up, move down, and add (+) icon are always shown. If the selected profile is at the most top of the list, move up will be disabled. Same goes if the selected profile is at the most bottom of the list, move down will be disabled.
// 4. User has 4 default profiles: Default, Game, Movie and Music. Default profiles have their own icons, can be moved up and down, but cannot be renamed or deleted. Hence delete and rename icon should not be shown on the UI if the selected profile is a default profile.

function ProfileList() {
  const { allProfiles } = useGetAllProfiles();
  const { selectedProfileId, selectedProfile } = useGetSelectedProfile();
  const { setSelectedProfileId } = useSetSelectedProfileId();
  const {
    firstProfileSelected,
    lastProfileSelected,
    moveProfileUp,
    moveProfileDown,
  } = useUpdateProfileOrder();
  const { createProfile } = useCreateProfile();
  const { toggleDeleteProfileDialog } = useToggleDeleteProfileDialog();

  return (
    <nav className={style.layout}>
      <h2 className={style.title}>PROFILE LIST</h2>
      <div className={style.profileWrapper}>
        <ul className={style.profileList}>
          {allProfiles.map(({ type, id, name }) => (
            <li key={id}>
              <button
                className={cn(style.profileListItem, style[type], {
                  [style.selected]: id === selectedProfileId,
                })}
                onClick={() => setSelectedProfileId(id)}
              >
                <span className={style.profileName}>{name}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className={style.profileListToolbar}>
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
            {selectedProfile.type === "custom" && (
              <>
                <button
                  className={style.toolbarIcon}
                  style={{ backgroundImage: "url(/images/icon_delete.svg)" }}
                  onClick={() => toggleDeleteProfileDialog()}
                />
                <button
                  className={style.toolbarIcon}
                  style={{ backgroundImage: "url(/images/icon_edit.svg)" }}
                />
              </>
            )}
            <button
              className={style.toolbarIcon}
              style={{ backgroundImage: "url(/images/icon_plus.svg)" }}
              onClick={() => createProfile()}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ProfileList;
