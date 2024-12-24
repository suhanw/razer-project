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
  const { showDeleteProfileDialog, toggleDeleteProfileDialog } =
    useToggleDeleteProfileDialog();
  const buttonRef = useRef();

  useEffect(() => {
    if (showDeleteProfileDialog) {
      // auto focus on delete button when dialog is open
      buttonRef.current?.focus();
    }
  }, [showDeleteProfileDialog]);

  return (
    <dialog
      className={cn(style.dialog, {
        [style.show]: showDeleteProfileDialog,
      })}
    >
      <strong>DELETE PROFILE</strong>
      <div>{selectedProfile.name}</div>
      <button
        ref={buttonRef}
        onClick={() => {
          toggleDeleteProfileDialog(false);
          deleteSelectedProfile();
        }}
        onBlur={() => toggleDeleteProfileDialog(false)}
      >
        DELETE
      </button>
    </dialog>
  );
}

export default DeleteProfileDialog;
