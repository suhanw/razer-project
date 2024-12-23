import React from "react";
import style from "./style";
import { useGetSelectedProfile } from "store/profiles";

function Profile() {
  const { selectedProfile } = useGetSelectedProfile();
  console.log({ selectedProfile });
  return <div className={style.layout}>
    <h1 className={style.profileName}>{selectedProfile.name}</h1>
  </div>
}

export default Profile;
