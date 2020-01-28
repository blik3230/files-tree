import React, { useCallback } from "react";

import IconButton from "../IconButton/IconButton";

function FolderHeader({
  isRoot,
  name,
  onAddFolder,
  onAddFile,
  onToggle,
  isOpen,
  isEmptyFolder,
  onDeleteFolder,
  isEdit
}) {
  const handleDelete = useCallback(() => onDeleteFolder(name), [
    name,
    onDeleteFolder
  ]);

  return (
    <div className="folder__header">
      {!isRoot && <div className="folder__icon" />}
      <div className="folder__name">{name}</div>
      <div className="folder__actions">
        <div className="folder__actions-toggle" />
        <div className="folder__actions-list">
          <div className="folder__actions-wrap-item">
            <IconButton icon="add-folder" onClick={onAddFolder} />
          </div>
          <div className="folder__actions-wrap-item">
            <IconButton icon="add-file" onClick={onAddFile} />
          </div>
          {!isRoot && (
            <div className="folder__actions-wrap-item">
              <IconButton icon="delete" onClick={handleDelete} />
            </div>
          )}
        </div>
      </div>
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
