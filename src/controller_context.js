import React from "react";

const controllerContext: ControllerState = {
  addParentToTree: () => {
    throw new Error("addParentToTree method has to be implemented");
  },
  deleteParentFromTree: () => {
    throw new Error("deleteParentFromTree has to be implemented");
  },
  hasFocus: () => {
    throw new Error("hasFocus has to be implemented");
  }
};

export const ControllerContext = React.createContext(controllerContext);
