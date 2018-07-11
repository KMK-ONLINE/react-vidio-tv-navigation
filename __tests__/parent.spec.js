import React from "react";
import {
  Parent,
  VerticalParent,
  HorizontalParent,
  MatrixParent,
  ParentWithContext
} from "../src/parent";

import { ControllerContext } from "../src/controller";
import { HORIZONTAL, VERTICAL, MATRIX } from "../src/const";
import { mount, shallow } from "enzyme";

class Item extends React.Component {
  render() {
    return <p> Dumb Component </p>;
  }
}

describe("Vertical Parent tests", () => {
  const wrapper = shallow(<VerticalParent />);

  it("should render a Parent component", () => {
    expect(wrapper.find(Parent).length).toBe(1);
  });

  it("Parents props should equal to Vertical", () => {
    expect(wrapper.find(Parent).props().focusableType).toBe(VERTICAL);
  });

  it("Parent forwards its children", () => {
    const wrapper = mount(
      <VerticalParent>
        <Item />
      </VerticalParent>
    );

    expect(wrapper.find(Parent).children().length).toBe(1);
    wrapper.unmount();
  });
});

describe("Horizontal Parent tests", () => {
  const wrapper = shallow(<HorizontalParent />);

  it("should render a Parent component", () => {
    expect(wrapper.find(Parent).length).toBe(1);
  });

  it("Parents props should equal to Horizontal", () => {
    expect(wrapper.find(Parent).props().focusableType).toBe(HORIZONTAL);
  });

  it("Parent forwards its children", () => {
    const wrapper = mount(
      <HorizontalParent>
        <Item />
      </HorizontalParent>
    );

    expect(wrapper.find(Parent).children().length).toBe(1);
    wrapper.unmount();
  });
});

describe("Matrix Parent tests", () => {
  const wrapper = mount(<MatrixParent />);

  it("should render a Parent component", () => {
    expect(wrapper.find(Parent).length).toBe(1);
  });

  it("Parents props should equal to Matrix", () => {
    expect(wrapper.find(Parent).props().focusableType).toBe(MATRIX);
  });

  it("Parent forwards its children", () => {
    const wrapper = mount(
      <MatrixParent>
        <Item />
      </MatrixParent>
    );
    expect(wrapper.find(Parent).children().length).toBe(1);
    wrapper.unmount();
  });

  it("Parent forwads its props to the children", () => {
    const props = { foo: "foo" };
    const wrapper = shallow(<MatrixParent {...props} />);
    expect(wrapper.find(Parent).props().foo).toBe(props["foo"]);
  });
});

describe("Parent tests", () => {
  it("should renders one ParentWithContext", () => {
    const wrapper = mount(<Parent />);
    expect(wrapper.find(ParentWithContext).length).toBe(1);
  });

  it("should consume the ControllerContext and forward its context", () => {
    const state = { tree: [] };
    const wrapper = mount(
      <ControllerContext.Provider value={state}>
        <Parent />
      </ControllerContext.Provider>
    );
    expect(wrapper.find(ParentWithContext).props().context).toBe(state);
    wrapper.unmount();
  });
});

describe("ParentWithContext tests", () => {
  it("should calls addToParentTree", () => {
    const spy = jest.spyOn(ParentWithContext.prototype, "addToParentTree");
    shallow(<ParentWithContext />);
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
    shallow(<ParentWithContext context={contextMock} />);
    expect(spy).toHaveBeenCalled();
    //TODO: test it has been called with the instance of the component
    spy.mockReset();
    spy.mockRestore();
  });
});
