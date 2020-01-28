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
  onChangeFolder
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
        />
      );
    }
  }

  const childrenArr = Object.keys(children);

  return (
    <div className="folder">
      <FolderHeader
        isEditFolderMode={isEditFolderMode}
        isRoot={isRoot}
        isOpen={isFolderOpen}
        isEmptyFolder={Object.keys(folder.children).length === 0}
        name={name}
        onAddFolder={handleAddFolder}
        onAddFile={handleAddFile}
        onToggle={handleToggle}
        onDeleteFolder={handleClickDeleteFolder}
        onSetEditFolderMode={() => setIsEditFolderMode(true)}
      />
      {isAddFolderMode && (
        <NewFolderForm
          value={value}
          onCancel={handleCancelAddFolder}
          onApply={handleApply}
          onChangeValue={setValue}
        />
      )}

      {isFolderOpen && !!childrenArr && childrenArr.length > 0 && (
        <div className="folder__children">
          {childrenArr.map(renderChildren)}
        </div>
      )}
    </div>
  );
}

export default Folder;
