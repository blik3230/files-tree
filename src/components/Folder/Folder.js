import React, { useCallback, useState } from "react";

import "./Folder.css";
import FolderHeader from "./FolderHeader";
import NewFolderForm from "./NewFolderForm";
import { NODE_TYPE } from "../../constans/common";

function Folder({
  folder,
  path,
  isOpen = false,
  onDeleteFolder,
  onChangeFolder,
  onRenameChildFolder
}) {
  const { children, name, isRoot } = folder;
  const [isAddFolderMode, setAddFolderMode] = useState(false);
  const [isEditFolderMode, setIsEditFolderMode] = useState(false);
  const [value, setValue] = useState("");
  const [isFolderOpen, setIsFolderOpen] = useState(isOpen);

  const handleAddFolder = useCallback(() => setAddFolderMode(true), []);
  const handleCancelAddFolder = useCallback(() => {
    setAddFolderMode(false);
    setValue("");
  }, []);
  const handleAddFile = useCallback(() => {}, []);
  const handleApply = useCallback(() => {
    setAddFolderMode(false);
    setIsFolderOpen(true);
    setValue("");

    const newFolder = {
      type: NODE_TYPE.folder,
      name: value,
      children: {}
    };

    onChangeFolder({
      ...folder,
      children: {
        ...folder.children,
        [newFolder.name]: newFolder
      }
    });
  }, [value, onChangeFolder, folder]);

  const handleChangeChildFolder = useCallback(
    childFolder =>
      onChangeFolder({
        ...folder,
        children: {
          ...folder.children,
          [childFolder.name]: childFolder
        }
      }),
    [onChangeFolder, folder]
  );

  const handleToggle = useCallback(() => setIsFolderOpen(!isFolderOpen), [
    isFolderOpen
  ]);

  const handleClickDeleteFolder = useCallback(
    () => onDeleteFolder(folder.name),
    [folder.name, onDeleteFolder]
  );

  const handleDeleteChildFolder = useCallback(
    folderName => {
      const newFolder = {
        ...folder,
        children: {
          ...folder.children
        }
      };

      delete newFolder.children[folderName];

      onChangeFolder(newFolder);
    },
    [folder, onChangeFolder]
  );

  const handleSetEditMode = useCallback(() => setIsEditFolderMode(true), []);
  const handleCancelEditMode = useCallback(
    () => setIsEditFolderMode(false),
    []
  );
  const handleApplyChangingFolderName = useCallback(
    editedFolderName => {
      handleCancelEditMode();

      const newFolder = {
        ...folder,
        name: editedFolderName
      };

      if (folder.isRoot) {
        onChangeFolder(newFolder);
        return;
      }

      onRenameChildFolder(folder.name, newFolder);
    },
    [handleCancelEditMode, onRenameChildFolder, folder, onChangeFolder]
  );

  const handleRenameChildFolder = useCallback(
    (oldChildFolderName, newChildFolder) => {
      const newFolder = {
        ...folder,
        children: {
          ...folder.children,
          [newChildFolder.name]: newChildFolder
        }
      };

      delete newFolder.children[oldChildFolderName];

      onChangeFolder(newFolder);
    },
    [folder, onChangeFolder]
  );

  function renderChildren(childName, index) {
    const child = children[childName];
    if (child.type === NODE_TYPE.folder) {
      return (
        <Folder
          key={path + child.name + "/"}
          folder={child}
          path={path + child.name + "/"}
          onDeleteFolder={handleDeleteChildFolder}
          onChangeFolder={handleChangeChildFolder}
          onRenameChildFolder={handleRenameChildFolder}
        />
      );
    }
  }

  const childrenArr = Object.keys(children);
  const shouldShowChildren =
    (isFolderOpen && !!childrenArr && childrenArr.length > 0) ||
    isAddFolderMode;

  return (
    <div className="folder">
      <FolderHeader
        isEditMode={isEditFolderMode}
        isRoot={isRoot}
        isOpen={isFolderOpen}
        isEmptyFolder={Object.keys(folder.children).length === 0}
        name={name}
        onAddFolder={handleAddFolder}
        onAddFile={handleAddFile}
        onToggle={handleToggle}
        onDeleteFolder={handleClickDeleteFolder}
        onSetEditFolderMode={() => setIsEditFolderMode(true)}
        onSetEditMode={handleSetEditMode}
        onCancelEditMode={handleCancelEditMode}
        onApplyEditMode={handleApplyChangingFolderName}
      />

      {shouldShowChildren && (
        <div className="folder__children">
          {isAddFolderMode && (
            <NewFolderForm
              value={value}
              onCancel={handleCancelAddFolder}
              onApply={handleApply}
              onChangeValue={setValue}
            />
          )}
          {childrenArr.map(renderChildren)}
        </div>
      )}
    </div>
  );
}

export default Folder;
