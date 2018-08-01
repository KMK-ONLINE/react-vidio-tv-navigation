import React from "react";
import { FocusableChild, Child } from "../src/child";
import { shallow, mount } from "enzyme";

jest.mock("../src/parent_context");

describe("Child tests", () => {
  it("should render an FocusableChild", () => {
    const comp = mount(<Child />);
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
  const comp = shallow(<Child />)
    .dive() //ParentContext
    .dive(); //FocusableChild

  it("should assign focusable as className by default", () => {
    expect(comp.state().className).toBe("focusable");
  });

  it("should assign className with the className passed as a prop", () => {
    const className = "foo";
    const comp = shallow(<Child className={className} />)
      .dive() //ParentContext
      .dive(); //FocusableChild
    expect(comp.state().className).toBe(className);
  });
});

describe("When mounting", () => {
  it("should calls addChildToTree", () => {
    const comp = shallow(<Child />);
    expect(comp.dive().props().context.addChildToTree).toHaveBeenCalled();
  });
});

describe("When unmounting", () => {
  it("should calls deleteChildFromTree", () => {
    const comp = shallow(<Child />);
    comp.unmount();
    expect(comp.dive().props().context.deleteChildFromTree).toHaveBeenCalled();
  });
});
