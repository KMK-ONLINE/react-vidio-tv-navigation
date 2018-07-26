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
    this.currentFocus = 0;
    this.state = {
      tree: [],
      type: props.focusableType,
      rows: props.rows,
      columns: props.columns,
      id: Math.random() * 1000000000
    };
  }

  componentDidMount() {
    if (this.props.context && this.props.context.addParentToTree)
      this.props.context.addParentToTree(this);
  }

  componentWillUnmount() {
    if (this.props.context && this.props.context.deleteParentFromTree)
      this.props.context.deleteParentFromTree(this);
  }

  render() {
    return (
      <ParentContext.Provider value={this.state}>
        <ul
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          className={this.props.className}
        >
          {this.props.children}
        </ul>
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
