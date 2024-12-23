import React from "react";

import style from "./style";

const profiles = [
  { id: "default", type: "default", name: "Default" },
  { id: "game", type: "game", name: "Game" },
  { id: "movie", type: "movie", name: "Movie" },
  { id: "music", type: "music", name: "Music" },
  { id: "custom-1", type: "custom", name: "Custom 1" },
  { id: "custom-1", type: "custom", name: "Custom 1" },
  { id: "custom-1", type: "custom", name: "Custom 1" },
  { id: "custom-1", type: "custom", name: "Custom 1" },
  {
    id: "demo",
    type: "custom",
    name: "Demo Long text Demo Long text Demo Long text Demo Long text Demo Long text ",
  },
];

function ProfileList() {
  return (
    <nav className={style.layout}>
      <h2 className={style.title}>PROFILE LIST</h2>
      <div className={style.profileWrapper}>
        <ul className={style.profileList}>
          {profiles.map(({ type, id, name }) => (
            <li key={id} className={style.profileListItem}>
              <button>
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
