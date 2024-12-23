import React from "react";

import style from "./style.less";
import ProfileList from "components/ProfileList";
import Profile from "components/Profile";

function App() {
  return (
    <div className={style.app}>
      <ProfileList />
      <Profile />
    </div>
  );
}

export default App;
