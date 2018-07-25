// @flow
import React from "react";
import {
  HORIZONTAL,
  VERTICAL,
  MATRIX,
  ENTER,
  DEFAULT,
  DOWN,
  RIGHT,
  LEFT,
  UP,
  POSITIVE,
  NEGATIVE
} from "./const";

type KeyMap = {
  "37": string,
  "38": string,
  "39": string,
  "40": string,
  "13": string
};

type Direction = DEFAULT | UP | DOWN | LEFT | RIGHT;

const keyMapping: KeyMap = {
  "37": LEFT,
  "38": UP,
  "39": RIGHT,
  "40": DOWN,
  "13": ENTER
};

const controllerContext: ControllerState = {
  currentFocus: 0,
  tree: []
};
export const ControllerContext = React.createContext(controllerContext);

export default class Controller extends React.Component {
  state: ControllerState;
  props: ControllerProps;

  constructor(props: ControllerProps) {
    super(props);
    this.currentFocus = 0;
    this.addParentToTree = this.addParentToTree.bind(this);
    this.deleteParentFromTree = this.deleteParentFromTree.bind(this);
    this.state = {
      tree: [],
      addParentToTree: this.addParentToTree,
      deleteParentFromTree: this.deleteParentFromTree
    };
  }

  onKeyDown(evt: KeyboardEvent) {
    const keymap = keyMapping[evt.keyCode];
    if (keymap === ENTER) {
      return this.handleEnter();
    } else {
      this.handleFocus(keymap);
    }
  }

  handleEnter(): void {
    const { tree } = this.state;
    const currentFocus = this.getFocusState();
    const parent = tree[currentFocus];
    const parentState = parent.state;
    if (parentState.tree[parentState.currentFocus].props.onEnter) {
      return parentState.tree[parentState.currentFocus].props.onEnter();
    }
  }

  setFocusState(index: number, cb?: number => void): void {
    this.currentFocus = index;
    if (cb) cb(this.currentFocus);
  }

  getFocusState(): number {
    return this.currentFocus;
  }

  handleFocus(direction: Direction): void {
    const { tree } = this.state;
    const index = this.getFocusState();

    if (tree[index].state.type === HORIZONTAL)
      this.handleFocusInHorizontalParent(direction);

    if (tree[index].state.type === VERTICAL)
      this.handleFocusInVerticalParent(direction);

    if (tree[index].state.type === MATRIX)
      this.handleFocusInMatrixParent(direction);
  }

  canMoveToPreviousParent(): boolean {
    return this.getFocusState() > 0;
  }

  canMoveToNextParent(): boolean {
    const { tree } = this.state;

    return this.getFocusState() < tree.length - 1;
  }

  focusInParentOnInitEdge(): boolean {
    const { tree } = this.state;
    const currentFocus = this.getFocusState();

    return tree[currentFocus].state.currentFocus === 0;
  }

  focusInParentOnFinalEdge(): boolean {
    const { tree } = this.state;
    const currentFocus = this.getFocusState();

    return (
      tree[currentFocus].state.currentFocus ===
      tree[currentFocus].state.tree.length - 1
    );
  }

  handleFocusInVerticalParent(direction: Direction) {
    const { tree } = this.state;
    const currentFocus = this.getFocusState();

    if (direction === LEFT && this.canMoveToPreviousParent()) {
      this.moveFocusInTree(NEGATIVE);
    }

    if (direction === RIGHT && this.canMoveToNextParent()) {
      this.moveFocusInTree(POSITIVE);
    }

    if (direction === UP) {
      if (this.focusInParentOnInitEdge() && this.canMoveToPreviousParent()) {
        this.moveFocusInTree(NEGATIVE);
      } else {
        this.moveFocusInParent(tree[currentFocus], NEGATIVE);
      }
    }

    if (direction === DOWN) {
      if (this.focusInParentOnFinalEdge() && this.canMoveToNextParent()) {
        this.moveFocusInTree(POSITIVE);
      } else {
        this.moveFocusInParent(tree[currentFocus], POSITIVE);
      }
    }
  }

  handleFocusInHorizontalParent(direction: Direction) {
    const { tree } = this.state;
    const currentFocus = this.getFocusState();

    if (direction === UP && this.canMoveToPreviousParent()) {
      this.moveFocusInTree(NEGATIVE);
    }

    if (direction === DOWN && this.canMoveToNextParent()) {
      this.moveFocusInTree(POSITIVE);
    }

    if (direction === LEFT) {
      if (this.focusInParentOnInitEdge() && this.canMoveToPreviousParent()) {
        this.moveFocusInTree(NEGATIVE);
      } else {
        this.moveFocusInParent(tree[currentFocus], NEGATIVE);
      }
    }

    if (direction === RIGHT) {
      if (this.focusInParentOnFinalEdge() && this.canMoveToNextParent()) {
        this.moveFocusInTree(POSITIVE);
      } else {
        this.moveFocusInParent(tree[currentFocus], POSITIVE);
      }
    }
  }

  handleFocusInMatrixParent(direction: Direction) {
    const { tree } = this.state;
    const currentFocus = this.getFocusState();
    const parent = tree[currentFocus];

    if (direction === RIGHT) {
      if (
        parent.state.currentFocus %
        parent.state.columns !==
        parent.state.columns - 1
      ) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.moveFocusInParent(parent, POSITIVE);
      } else if (this.canMoveToNextParent()) {
        this.moveFocusInTree(POSITIVE);
      }
    }

    if (direction === LEFT) {
      if (parent.state.currentFocus % parent.state.columns !== 0) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.moveFocusInParent(parent, NEGATIVE);
      } else if (this.canMoveToPreviousParent()) {
        this.moveFocusInTree(NEGATIVE);
      }
    }

    if (direction === DOWN) {
      if (
        parent.state.columns * parent.state.rows - parent.state.currentFocus >
        parent.state.columns
      ) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.moveFocusInParent(parent, POSITIVE, parent.state.columns);
      } else if (this.canMoveToNextParent()) {
        this.moveFocusInTree(POSITIVE);
      }
    }

    if (direction === UP) {
      if (parent.state.currentFocus - parent.state.columns >= 0) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.moveFocusInParent(parent, NEGATIVE, parent.state.columns);
      } else if (this.canMoveToPreviousParent()) {
        this.moveFocusInTree(NEGATIVE);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown.bind(this));
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    this.setParentFocus(this.getFocusState());
  }

  setParentFocus(index: number): void {
    this.setFocusState(index, () => {
      if (this.state.tree.length > 0) {
        const parent = this.state.tree[index];
        this.moveFocusInParent(parent, DEFAULT);
      }
    });
  }

  moveFocusInParent(
    parent: ParentType,
    direction: DEFAULT | NEGATIVE | POSITIVE,
    threeshold: ?number = null
  ): void {
    const { currentFocus, tree } = parent.state;

    if (direction === DEFAULT) {
      this.setFocusInParent(parent, currentFocus);
    }

    if (direction === NEGATIVE) {
      if (currentFocus > 0) {
        this.quitFocusInParent(parent, currentFocus);
        this.setFocusInParent(
          parent,
          threeshold ? currentFocus - threeshold : currentFocus - 1
        );
      }
    }

    if (direction === POSITIVE) {
      if (currentFocus < tree.length - 1) {
        this.quitFocusInParent(parent, currentFocus);
        this.setFocusInParent(
          parent,
          threeshold ? currentFocus + threeshold : currentFocus + 1
        );
      }
    }
  }

  moveFocusInTree(direction: NEGATIVE | POSITIVE) {
    const { tree } = this.state;
    const currentFocus = this.getFocusState();
    const nextFocus =
      direction == NEGATIVE ? currentFocus - 1 : currentFocus + 1;
    this.quitFocusInParent(
      tree[currentFocus],
      tree[currentFocus].state.currentFocus
    );
    this.setFocusState(nextFocus, nextFocus => {
      const parent = this.state.tree[nextFocus];
      this.moveFocusInParent(parent, DEFAULT);
    });
  }

  setFocusInParent(parent: ParentType, focusIndex: number): void {
    if (parent.props.onFocus) {
      parent.props.onFocus(focusIndex);
    }
    if (parent.state.tree[focusIndex].props.onFocus) {
      parent.state.tree[focusIndex].props.onFocus();
    }
    parent.state.currentFocus = focusIndex;
  }

  quitFocusInParent(parent: ParentType, focusIndex: number): void {
    if (parent.props.onBlur) {
      parent.props.onBlur(focusIndex);
    }
    if (parent.state.tree[focusIndex].props.onBlur) {
      parent.state.tree[focusIndex].props.onBlur();
    }
    parent.state.currentFocus = focusIndex;
  }

  addParentToTree(parent: ParentType): void {
    this.state.tree.push(parent);

    if (parent.props.withFocus) {
      const currentFocus = this.getFocusState();
      const parentWithFocus = this.state.tree[currentFocus];
      this.quitFocusInParent(
        parentWithFocus,
        parentWithFocus.state.currentFocus
      );

      this.setParentFocus(this.state.tree.indexOf(parent));
    }
  }

  deleteParentFromTree(parent: ParentType): void {
    const currentFocus = this.getFocusState();
    const index = this.state.tree.indexOf(parent);

    if (index === currentFocus) {
      this.state.tree.splice(index, 1);
      this.setParentFocus(0);
    } else {
      if (index < currentFocus) {
        this.setFocusState(currentFocus - 1);
      }
      this.state.tree.splice(index, 1);
    }
  }

  render() {
    return (
      <ControllerContext.Provider value={this.state}>
        {this.props.children}
      </ControllerContext.Provider>
    );
  }
}
