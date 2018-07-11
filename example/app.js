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
  render() {
    return (
      <Controller>
        <h1> Horizontal Columns + Vertical Columns </h1>
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
            <HorizontalParent className={"horizontal-columns-total"}>
              <Item />
              <Item />
              <span className="focusable">
                <p> I am not allowed to be focused </p>
                <p> lorem ipsum </p>
              </span>
              <Item />
            </HorizontalParent>
            <HorizontalParent className={"horizontal-columns-total"}>
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
        <h1> Vertical Columns </h1>
        <div className={"vertical-columns"}>
          <VerticalParent className={"vertical-focusable"}>
            <Item />
            <Item />
          </VerticalParent>
          <VerticalParent className={"vertical-focusable"}>
            <Item />
            <Item />
            <span className="focusable">
              <span> I am not allowed to be focused </span>
              <span> This item is not part of the Matrix </span>
            </span>
            <Item />
          </VerticalParent>
        </div>
        <h1> Horizontal Columns </h1>
        <HorizontalParent className={"horizontal-columns"}>
          <Item />
          <Item />
        </HorizontalParent>
        <HorizontalParent className={"horizontal-columns"}>
          <Item />
          <Item />
          <span className="focusable">
            <p> I am not allowed to be focused </p>
            <p> lorem ipsum </p>
          </span>
          <Item />
        </HorizontalParent>
        <HorizontalParent className={"horizontal-columns"}>
          <Item />
          <span className="focusable">
            <p> I am not allowed to be focused </p>
            <p> lorem ipsum </p>
          </span>
          <Item />
          <Item />
        </HorizontalParent>
        <h1> Matrix </h1>
        <MatrixParent columns={4} rows={3} className="matrix">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </MatrixParent>
      </Controller>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
