import type { ChildrenArray, Element, Component } from "react";

declare type FocusableChild = {
  type: string
};

declare type ContextType = {
  name: string,
  currentFocus: number,
  tree: ParentType[]
};

declare type ParentType = {
  currentFocus: number,
  tree: Array<ChildState>,
  type: string,
  state: ParentState,
  props: ParentProps,
  columns: number,
  rows: number
};

declare type ParentState = {
  currentFocus: number,
  tree: Array<ChildType>,
  type: FocusableType,
  columns: number,
  rows: number
};

declare type ParentProps = {
  context: ParentType,
  focusableType: FocusableType,
  rows: number,
  columns: number
};

declare type ControllerState = {
  currentFocus: number,
  tree: ParentType[]
};

declare type ControllerProps = {
  children: ChildrenArray<Component>
};

declare type ChildType = {
  currentFocus: number,
  tree: Array<Component<FocusableChild>>,
  type: string,
  state: ChildState,
  props: ChildProps
};

declare type ChildState = {
  currentFocus: number,
  tree: Array<Component<FocusableChild>>,
  type: FocusableType
};

declare type ChildProps = {
  className: string,
  context: ParentType,
  onEnter: () => void,
  onFocus: () => void,
  onBlur: () => void
};

declare type FocusableType = "horizontal" | "vertical" | "matrix";

declare type MatrixProps = {};

declare type MatrixState = {};
