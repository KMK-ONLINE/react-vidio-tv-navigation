import React from "react";
import ReactDOM from "react-dom";
import Controller from "./../src/controller";
import {
  VerticalParent,
  HorizontalParent,
  MatrixParent
} from "./../src/parent";
import { Child } from "./../src/child";

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = { focused: false };
  }

  focus() {
    this.setState(() => {
      return { focused: true };
    });
  }

  blur() {
    this.setState(() => {
      return { focused: false };
    });
  }

  enter() {
    alert("Enter");
  }

  render() {
    return (
      <Child
        onFocus={() => this.focus()}
        onEnter={() => this.enter()}
        onBlur={() => this.blur()}
      >
        <span
          className={this.state.focused ? "focusable focused" : "focusable"}
        />
      </Child>
    );
  }
}

class App extends React.Component {
  focus(index) {
    alert("Focus on element " + index);
  }

  blur(index) {
    alert("Blur on element " + index);
  }
  render() {
    return (
      <Controller>
        <h1> Horizontal Columns + Vertical Columns </h1>
        <h2> Example merging different kind of parents </h2>
        <div className="horizontal-vertical">
          <VerticalParent className={"vertical-focusable-total"}>
            <Item />
            <Item />
          </VerticalParent>
          <div className="horizontal-section">
            <HorizontalParent className={"horizontal-columns-total"}>
              <Item />
              <Item />
            </HorizontalParent>
            <HorizontalParent forceFocus="0" currentFocus="1" className={"horizontal-columns-total"} withFocus>
              <Item />
              <Item />
              <span className="focusable">
                <p> I am not allowed to be focused </p>
                <p> lorem ipsum </p>
              </span>
              <Item />
            </HorizontalParent>
            <HorizontalParent forceFocus="0" className={"horizontal-columns-total"}>
              <Item />
              <span className="focusable">
                <p> I am not allowed to be focused </p>
                <p> lorem ipsum </p>
              </span>
              <Item />
              <Item />
            </HorizontalParent>
          </div>
        </div>
      </Controller>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
