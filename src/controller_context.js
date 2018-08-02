import React from "react";

const controllerContext: ControllerState = {
  addParentToTree: () => {
    throw new Error(
      "addParentToTree method has to be implemented. It happens because ControllerContext.Provider is not used"
    );
  },
  deleteParentFromTree: () => {
    throw new Error(
      "deleteParentFromTree has to be implemented. It happens because ControllerContext.Provider is not used"
    );
  },
  hasFocus: () => {
    throw new Error(
      "hasFocus has to be implemented. It happens because ControllerContext.Provider is not used"
    );
  },

  findAnotherParent: () => {
    throw new Error(
      "findAnotherParent has to be implemented. It happens because ControllerContext.Provider is not used"
    );
  }
};

export const ControllerContext = React.createContext(controllerContext);
