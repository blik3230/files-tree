import { getFolderByPath, changeNodeByPath } from "./Tree";
import { NODE_TYPE } from "../../constans/common";

const MOCK_TREE = {
  type: NODE_TYPE.folder,
  children: {
    test: {
      type: NODE_TYPE.folder,
      children: {
        "test 1": {
          type: NODE_TYPE.folder,
          children: {}
        }
      }
    }
  }
};

it("should return 'test 1' folder by path", () => {
  const folder = getFolderByPath(MOCK_TREE, "/test/test 1");

  expect(folder).toBe(MOCK_TREE.children["test"].children["test 1"]);
});

it("shoule change node by path", () => {
  const newNode = {
    type: NODE_TYPE.folder,
    children: {}
  };

  const path = "/test/test 1";

  const newTree = changeNodeByPath(MOCK_TREE, path, newNode);

  expect(newTree.children["test"].children["test 1"]).toBe(newNode);
});
