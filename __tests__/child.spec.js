import React from "react";
import { FocusableChild, Child } from "../src/child";
import { shallow, mount } from "enzyme";

describe("Child tests", () => {
  it("should render an FocusableChild", () => {
    const props = { foo: "foo" };
    const comp = mount(<Child props={props} />);
    expect(comp.find(FocusableChild).length).toBe(1);
    comp.unmount();
  });

  it("should pass the props to FocusableChild", () => {
    const passedProps = { foo: "foo" };
    const comp = mount(<Child passedProps={passedProps} />);
    expect(comp.find(FocusableChild).props().passedProps).toBe(passedProps);
    comp.unmount();
  });
});

describe("FocusableChild test", () => {
  const comp = shallow(<FocusableChild />);

  it("should assign focusable as className by default", () => {
    expect(comp.state().className).toBe("focusable");
  });

  it("should assign className with the className passed as a prop", () => {
    const className = "foo";
    const comp = shallow(<FocusableChild className={className} />);
    expect(comp.state().className).toBe(className);
  });

  it("should calls addToParentTree", () => {
    const spy = jest.spyOn(FocusableChild.prototype, "addToParentTree");
    shallow(<FocusableChild />);
    expect(spy).toHaveBeenCalled();
    spy.mockReset();
    spy.mockRestore();
  });

  it("should add the component to the context's tree", () => {
    const contextMock = {
      tree: {
        push() {}
      }
    };
    const spy = jest.spyOn(contextMock.tree, "push");
    shallow(<FocusableChild context={contextMock} />);
    expect(spy).toHaveBeenCalled();
    //TODO: test if it has been called with the instance of the component (this)
    spy.mockReset();
    spy.mockRestore();
  });
});
