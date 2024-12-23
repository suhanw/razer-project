import React, { useRef, useEffect } from "react";
import cn from "classnames";

import style from "./style";
import {
  useGetSelectedProfile,
  useDeleteSelectedProfile,
} from "store/profiles";
import { useToggleDeleteProfileDialog } from "../../store/ui";

function DeleteProfileDialog() {
  const { selectedProfile } = useGetSelectedProfile();
  const { deleteSelectedProfile } = useDeleteSelectedProfile();
  const { showDeleteProfileDialog, toggleDeleteProfileDialog } = useToggleDeleteProfileDialog();
  const dialogRef = useRef();

  const handleClick = () => {
    toggleDeleteProfileDialog();
    deleteSelectedProfile();
  };

  return (
    <dialog
      ref={dialogRef}
      className={cn(style.dialog, {
        [style.show]: showDeleteProfileDialog,
      })}
    >
      <strong>DELETE PROFILE</strong>
      <div>{selectedProfile.name}</div>
      <button onClick={handleClick}>DELETE</button>
    </dialog>
  );
}

export default DeleteProfileDialog;
