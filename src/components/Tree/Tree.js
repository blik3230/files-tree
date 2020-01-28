import React, { useState, useCallback } from "react";

import "./Tree.css";

import Folder from "../Folder/Folder";
import { NODE_TYPE, PROJECT_NAME } from "../../constans/common";

function Tree(props) {
  const [rootFolder, setRootFolder] = useState({
    type: NODE_TYPE.folder,
    name: PROJECT_NAME,
    isRoot: true,
    children: {}
  });

  const handleChangeFolder = useCallback(
    newRootFolder => setRootFolder(newRootFolder),
    []
  );

  return (
    <div className="tree">
      <Folder
        isOpen
        folder={rootFolder}
        path="/"
        onAddFolder={handleChangeFolder}
        onDeleteFolder={handleChangeFolder}
        onChangeFolder={handleChangeFolder}
      />
    </div>
  );
}

export function changeNodeByPath(tree, path, newNode) {
  if (path === "/") {
    return newNode;
  }

  const pathAsArr = path
    .substring(1)
    .split("/")
    .filter(folderName => !!folderName);

  const newTree = {
    ...tree,
    children: {
      ...tree.children
    }
  };

  pathAsArr.reduce((acc, folderName, index) => {
    const isLastItem = pathAsArr.length - 1 === index;
    const children = acc.children;
    const node = isLastItem
      ? newNode
      : getFolderByPath(tree, pathAsArr.slice(0, index - 1).join("/")) || {
          type: NODE_TYPE.folder,
          name: folderName,
          children: {}
        };

    children[folderName] = node;

    return children[folderName];
  }, newTree);

  return newTree;
}

export function getFolderByPath(tree, path) {
  if (path === "/") {
    return tree;
  }

  const result = path
    .substring(1)
    .split("/")
    .filter(folderName => !!folderName)
    .reduce((acc, folderName) => {
      if (!acc || !acc.children[folderName]) {
        return null;
      }

      return acc.children[folderName];
    }, tree);

  return result;
}

export default Tree;
