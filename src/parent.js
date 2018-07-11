// @flow

import React from "react";
import type { ChildrenArray, Component } from "react";
import { ControllerContext } from "./controller";
import { HORIZONTAL, VERTICAL, MATRIX } from "./const";

const parentContext: ParentState = {
  currentFocus: 0,
  columns: 0,
  rows: 0,
  tree: [],
  type: HORIZONTAL
};

export const ParentContext = React.createContext(parentContext);

export class ParentWithContext extends React.Component<
  ParentProps,
  ParentState
> {
  constructor(props: ParentProps) {
    super(props);
    this.state = {
      currentFocus: 0,
      tree: [],
      type: props.focusableType,
      rows: props.rows,
      columns: props.columns
    };
  }

  componentDidMount() {
    this.addToParentTree();
  }

  addToParentTree(): void {
    if (this.props.context && this.props.context.tree)
      this.props.context.tree.push(this);
  }

  render() {
    return (
      <ParentContext.Provider value={this.state}>
        <ul className={this.props.className}>{this.props.children}</ul>
      </ParentContext.Provider>
    );
  }
}
export class Parent extends React.Component<{}, ParentType> {
  render() {
    return (
      <ControllerContext.Consumer>
        {value => {
          return <ParentWithContext {...this.props} context={value} />;
        }}
      </ControllerContext.Consumer>
    );
  }
}

export class HorizontalParent extends React.Component<
  { children: ChildrenArray<Component> },
  {}
> {
  render() {
    return (
      <Parent {...this.props} focusableType={HORIZONTAL}>
        {this.props.children}
      </Parent>
    );
  }
}

export class MatrixParent extends React.Component<
  { children: ChildrenArray<Component> },
  {}
> {
  render() {
    return (
      <Parent {...this.props} focusableType={MATRIX}>
        {this.props.children}
      </Parent>
    );
  }
}

export class VerticalParent extends React.Component<
  { children: ChildrenArray<Component> },
  {}
> {
  render() {
    return (
      <Parent {...this.props} focusableType={VERTICAL}>
        {this.props.children}{" "}
      </Parent>
    );
  }
}
