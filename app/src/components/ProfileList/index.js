import React from "react";
import cn from "classnames";

import style from "./style";
import { useGetAllProfiles, useSetSelectedProfileId } from "store/profiles";

function ProfileList() {
  const { allProfiles } = useGetAllProfiles();
  const { selectedProfileId, setSelectedProfileId } = useSetSelectedProfileId();

  return (
    <nav className={style.layout}>
      <h2 className={style.title}>PROFILE LIST</h2>
      <div className={style.profileWrapper}>
        <ul className={style.profileList}>
          {allProfiles.map(({ type, id, name }) => (
            <li
              key={id}
              className={cn({
                [style.profileListItem]: true,
                [style.selected]: id === selectedProfileId,
              })}
            >
              <button onClick={() => setSelectedProfileId(id)}>
                <img
                  className={style.profileIcon}
                  src={`/images/icon_profiles_${type}.svg`}
                />
                <span className={style.profileName}>{name}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className={style.profileListToolbar}>
          <div className={style.reorderIcons}>
            <button
              className={style.toolbarIcon}
              style={{ backgroundImage: "url(/images/icon_arrow_up.svg)" }}
            />
            <button
              className={style.toolbarIcon}
              style={{ backgroundImage: "url(/images/icon_arrow_down.svg)" }}
            />
          </div>
          <div className={style.crudIcons}>
            <button
              className={style.toolbarIcon}
              style={{ backgroundImage: "url(/images/icon_delete.svg)" }}
            />
            <button
              className={style.toolbarIcon}
              style={{ backgroundImage: "url(/images/icon_edit.svg)" }}
            />
            <button
              className={style.toolbarIcon}
              style={{ backgroundImage: "url(/images/icon_plus.svg)" }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default ProfileList;
