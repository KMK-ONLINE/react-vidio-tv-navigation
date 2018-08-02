import React from "react";
import { ControllerContext } from "../src/controller_context";
import { mount } from "enzyme";

describe("ControllerContext", () => {
  let defaultContext;
  mount(
    <div>
      <ControllerContext.Consumer>
        {value => ((defaultContext = value), <p> I am dumb </p>)}
      </ControllerContext.Consumer>
    </div>
  );

  it("AddParentToTree", () => {
    expect(() => {
      defaultContext.addParentToTree();
    }).toThrow();
  });

  it("deleteParentFromTree", () => {
    expect(() => {
      defaultContext.deleteParentFromTree();
    }).toThrow();
  });

  it("hasFocus", () => {
    expect(() => {
      defaultContext.hasFocus();
    }).toThrow();
  });

  it("findAnotherParent", () => {
    expect(() => {
      defaultContext.findAnotherParent();
    }).toThrow();
  });
});
