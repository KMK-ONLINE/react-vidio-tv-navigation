import React from "react";
import { HORIZONTAL } from "./const";

const parentContext: ParentState = {
  columns: 0,
  rows: 0,
  tree: [],
  type: HORIZONTAL,
  addChildToTree: () => {
    throw new Error(
      "addChildToTree method has to be implemented. It happens because ParentContext.Consumer has been used without the ParentContext.Provider"
    );
  },
  deleteChildFromTree: () => {
    throw new Error(
      "deleteChildFromTree method has to be implemented. It happens because ParentContext.Consumer has been used without the ParentContext.Provider"
    );
  }
};

export const ParentContext = React.createContext(parentContext);
