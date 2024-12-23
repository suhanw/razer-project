import React from "react";

import style from "./style.less";
import ProfileList from "components/ProfileList";
import Profile from "components/Profile";
import DeleteProfileDialog from "components/DeleteProfileDialog";

// 1. Left panel contains the profile list and the right panel contains the selected profile name.

function App() {
  return (
    <div className={style.app}>
      <ProfileList />
      <Profile />
      <DeleteProfileDialog />
    </div>
  );
}

export default App;
