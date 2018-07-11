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
    this.state = {
      currentFocus: 0,
      tree: []
    };
  }

  onKeyDown(evt: KeyboardEvent) {
    const keymap = keyMapping[evt.keyCode];
    if (keymap === ENTER) {
      this.handleEnter();
    }
    this.handleFocus(keymap);
  }

  handleEnter(): void {
    const { currentFocus, tree } = this.state;
    const parent = tree[currentFocus];
    const state = parent.state;
    if (state.tree[state.currentFocus].props.onEnter) {
      state.tree[state.currentFocus].props.onEnter();
    }
  }

  handleFocus(direction: Direction): void {
    const { currentFocus, tree } = this.state;

    if (tree[currentFocus].state.type === HORIZONTAL)
      this.handleFocusInHorizontalParent(direction);

    if (tree[currentFocus].state.type === VERTICAL)
      this.handleFocusInVerticalParent(direction);

    if (tree[currentFocus].state.type === MATRIX)
      this.handleFocusInMatrixParent(direction);
  }

  handleFocusInVerticalParent(direction: Direction) {
    const { currentFocus, tree } = this.state;
    let parent;

    if (direction === LEFT) {
      if (currentFocus > 0) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.setState(
          () =>
            Object.assign({}, this.state, {
              currentFocus: currentFocus - 1
            }),
          () => {
            parent = this.state.tree[this.state.currentFocus];
            this.moveFocusInParent(parent, DEFAULT);
          }
        );
      }
    }

    if (direction === RIGHT) {
      if (currentFocus < tree.length - 1) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.setState(
          () =>
            Object.assign({}, this.state, { currentFocus: currentFocus + 1 }),
          () => {
            parent = this.state.tree[this.state.currentFocus];
            this.moveFocusInParent(parent, DEFAULT);
          }
        );
      }
    }

    if (direction === DOWN || direction === UP) {
      parent = tree[currentFocus];
      this.moveFocusInParent(parent, direction === DOWN ? POSITIVE : NEGATIVE);
    }
  }

  handleFocusInHorizontalParent(direction: Direction) {
    const { currentFocus, tree } = this.state;
    let parent;

    if (direction === UP) {
      if (currentFocus > 0) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.setState(
          () =>
            Object.assign({}, this.state, {
              currentFocus: currentFocus - 1
            }),
          () => {
            parent = this.state.tree[this.state.currentFocus];
            this.moveFocusInParent(parent, DEFAULT);
          }
        );
      }
    }

    if (direction === DOWN) {
      if (currentFocus < tree.length - 1) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.setState(
          () =>
            Object.assign({}, this.state, { currentFocus: currentFocus + 1 }),
          () => {
            parent = this.state.tree[this.state.currentFocus];
            this.moveFocusInParent(parent, DEFAULT);
          }
        );
      }
    }

    if (direction === LEFT) {
      parent = tree[currentFocus];

      if (parent.state.currentFocus === 0) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.setState(
          () =>
            Object.assign({}, this.state, {
              currentFocus: currentFocus - 1
            }),
          () => {
            parent = this.state.tree[this.state.currentFocus];
            this.moveFocusInParent(parent, DEFAULT);
          }
        );
      } else {
        this.moveFocusInParent(
          parent,
          direction === RIGHT ? POSITIVE : NEGATIVE
        );
      }
    }

    if (direction === RIGHT || direction === LEFT) {
      parent = tree[currentFocus];
      this.moveFocusInParent(parent, direction === RIGHT ? POSITIVE : NEGATIVE);
    }
  }

  handleFocusInMatrixParent(direction: Direction) {
    const { currentFocus, tree } = this.state;
    let parent;

    if (direction === RIGHT) {
      parent = tree[currentFocus];
      if (
        parent.state.currentFocus % parent.state.columns !==
        parent.state.columns - 1
      ) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.moveFocusInParent(parent, POSITIVE);
      }
    }

    if (direction === LEFT) {
      parent = tree[currentFocus];
      if (parent.state.currentFocus % parent.state.columns !== 0) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.moveFocusInParent(parent, NEGATIVE);
      }
    }

    if (direction === DOWN) {
      parent = tree[currentFocus];
      if (
        parent.state.columns * parent.state.columns -
          parent.state.currentFocus >
        parent.state.columns
      ) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.moveFocusInParent(parent, POSITIVE, parent.state.columns);
      }
    }

    if (direction === UP) {
      parent = tree[currentFocus];
      if (parent.state.currentFocus - parent.state.columns >= 0) {
        this.quitFocusInParent(
          tree[currentFocus],
          tree[currentFocus].state.currentFocus
        );
        this.moveFocusInParent(parent, NEGATIVE, parent.state.columns);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown.bind(this));
  }

  componentDidMount() {
    window.addEventListener("keydown", this.onKeyDown.bind(this));

    this.setParentFocus(this.state.currentFocus);
  }

  setParentFocus(index: number): void {
    this.setState(
      () => Object.assign({}, this.state, { currentFocus: index }),
      () => {
        if (this.state.tree.length > 0) {
          const parent = this.state.tree[index];
          this.moveFocusInParent(parent, DEFAULT);
        }
      }
    );
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

  setFocusInParent(parent: ParentType, focusIndex: number): void {
    if (parent.state.tree[focusIndex].props.onFocus)
      parent.state.tree[focusIndex].props.onFocus();
    parent.state.currentFocus = focusIndex;
  }

  quitFocusInParent(parent: ParentType, focusIndex: number): void {
    if (parent.state.tree[focusIndex].props.onBlur)
      parent.state.tree[focusIndex].props.onBlur();
    parent.state.currentFocus = focusIndex;
  }

  render() {
    return (
      <ControllerContext.Provider value={this.state}>
        {this.props.children}
      </ControllerContext.Provider>
    );
  }
}
