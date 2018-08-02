// @flow

import React from "react";
import type { ChildrenArray, Component } from "react";
import { HORIZONTAL, VERTICAL, MATRIX } from "./const";
import { ParentContext } from "./parent_context";
import { ControllerContext } from "./controller_context";

export class ParentWithContext extends React.Component<
  ParentProps,
  ParentState
> {
  constructor(props: ParentProps) {
    super(props);
    this.currentFocus = 0;
    this.addChildToTree = this.addChildToTree.bind(this);
    this.deleteChildFromTree = this.deleteChildFromTree.bind(this);

    this.state = {
      tree: [],
      type: props.focusableType,
      rows: props.rows,
      columns: props.columns,
      id: Math.random() * 1000000000,
      addChildToTree: this.addChildToTree,
      deleteChildFromTree: this.deleteChildFromTree
    };
  }

  addChildToTree(child: ChildType): void {
    this.state.tree.push(child);
  }

  deleteChildFromTree(child: ChildType): void {
    const index = this.state.tree.indexOf(child);

    if (index === this.currentFocus) {
      this.state.tree.splice(index, 1);

      if (this.state.tree.length === 0 && this.hasFocusInController()) {
        return this.props.context.findAnotherParent();
      }

      this.currentFocus = index > 0 ? index - 1 : 0;
      if (
        this.hasFocusInController() &&
        this.state.tree[this.currentFocus].props.onFocus
      ) {
        this.state.tree[this.currentFocus].props.onFocus();
      }
    } else {
      if (index < this.currentFocus) {
        if (this.state.tree[this.currentFocus].props.onBlur) {
          this.state.tree[this.currentFocus].props.onBlur(this.currentFocus);
        }
        this.currentFocus = this.currentFocus - 1;
        if (this.state.tree[this.currentFocus].props.onFocus) {
          this.state.tree[this.currentFocus].props.onFocus(this.currentFocus);
        }
      }
      this.state.tree.splice(index, 1);
    }
  }

  hasFocusInController() {
    return this.props.context.hasFocus(this);
  }

  componentDidMount() {
    this.props.context.addParentToTree(this);
  }

  componentWillUnmount() {
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
        {state => <ParentWithContext {...this.props} context={state} />}
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
