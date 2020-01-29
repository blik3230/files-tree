import React, { useCallback, Fragment, useState } from "react";

import IconButton from "../IconButton/IconButton";
import NewFolderForm from "./NewFolderForm";

function FolderHeader({
  isRoot,
  name,
  onAddFolder,
  onAddFile,
  onToggle,
  isOpen,
  isEmptyFolder,
  onDeleteFolder,
  isEditMode,
  onSetEditMode,
  onCancelEditMode,
  onApplyEditMode
}) {
  const [editedFolderName, setEditedFolderName] = useState(name);

  const handleDelete = useCallback(() => onDeleteFolder(name), [
    name,
    onDeleteFolder
  ]);
  const handleApply = useCallback(() => {
    onApplyEditMode(editedFolderName);
  }, [onApplyEditMode, editedFolderName]);

  return (
    <div className="folder__header">
      {!isRoot && <div className="folder__icon" />}
      {isEditMode ? (
        <NewFolderForm
          value={editedFolderName}
          onCancel={onCancelEditMode}
          onApply={handleApply}
          onChangeValue={setEditedFolderName}
        />
      ) : (
        <Fragment>
          <div className="folder__name">{name}</div>
          <div className="folder__actions">
            <div className="folder__actions-toggle" />
            <div className="folder__actions-list">
              <div className="folder__actions-wrap-item">
                <IconButton icon="add-folder" onClick={onAddFolder} />
              </div>
              <div className="folder__actions-wrap-item">
                <IconButton icon="rename-folder" onClick={onSetEditMode} />
              </div>
              {!isRoot && (
                <div className="folder__actions-wrap-item">
                  <IconButton icon="delete" onClick={handleDelete} />
                </div>
              )}
            </div>
          </div>
        </Fragment>
      )}

      {!isEmptyFolder && (
        <div
          className={`folder__toggle ${isOpen && "folder__toggle_open"}`}
          onClick={onToggle}
        />
      )}
    </div>
  );
}

export default FolderHeader;
