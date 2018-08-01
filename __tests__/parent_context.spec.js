import React from "react";
import { ParentContext } from "../src/parent_context";
import { mount } from "enzyme";

describe("ParentContext", () => {
  let defaultContext;
  mount(
    <div>
      <ParentContext.Consumer>
        {value => ((defaultContext = value), <p> I am dumb </p>)}
      </ParentContext.Consumer>
    </div>
  );

  it("AddChildToTree", () => {
    expect(() => {
      defaultContext.addChildToTree();
    }).toThrow();
  });

  it("deleteChildFromTree", () => {
    expect(() => {
      defaultContext.deleteChildFromTree();
    }).toThrow();
  });
});
