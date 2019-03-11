import React from "react";
import {
  Parent,
  VerticalParent,
  HorizontalParent,
  MatrixParent,
  ParentWithContext
} from "../src/parent";
import { Child } from "../src/child";

import { HORIZONTAL, VERTICAL, MATRIX } from "../src/const";
import { mount, shallow } from "enzyme";

jest.mock("../src/controller_context");

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

describe("Vertical Parent currentFocus props tests", () => {
  it("Parent contains currentFocus props", () => {
    const wrapper = mount(
      <VerticalParent currentFocus="1">
        <Item />
        <Item />
      </VerticalParent>
    );

    expect(wrapper.find(ParentWithContext).instance().currentFocus).toBe(1);
    expect(wrapper.find(Parent).props().currentFocus).toBe('1');
    wrapper.unmount();
  });
});

 describe("Horizontal Parent currentFocus props tests", () => {
  it("Parent contains currentFocus props", () => {
    const wrapper = mount(
      <HorizontalParent currentFocus="1">
        <Item />
        <Item />
      </HorizontalParent>
    );

    expect(wrapper.find(ParentWithContext).instance().currentFocus).toBe(1);
    expect(wrapper.find(Parent).props().currentFocus).toBe('1');
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
});

describe("ParentWithContext tests", () => {
  describe("When mounting the component", () => {
    it("should calls addParentToTree from the context", () => {
      const parentWithContextComp = shallow(<VerticalParent />)
        .dive() // ControllerContext
        .dive(); // ParentWithContext
      expect(
        parentWithContextComp.props().context.addParentToTree
      ).toHaveBeenCalled();
    });
  });

  describe("When unmounting the component", () => {
    it("should calls deleteParentFromTree from the context", () => {
      const parentWithContextComp = shallow(<VerticalParent />)
        .dive() // ControllerContext
        .dive(); // ParentWithContext
      parentWithContextComp.unmount();
      expect(
        parentWithContextComp.props().context.deleteParentFromTree
      ).toHaveBeenCalled();
    });
  });

  describe("HasFocusInController", () => {
    it("should calls hasFocus from the context", () => {
      const parentWithContextComp = shallow(<VerticalParent />)
        .dive() // ControllerContext
        .dive(); // ParentWithContext

      parentWithContextComp
        .shallow()
        .instance()
        .hasFocusInController();
      expect(parentWithContextComp.props().context.hasFocus).toHaveBeenCalled();
    });
  });

  describe("AddChildToTree", () => {
    it("should add the Child to the tree", () => {
      const parentWithContextComp = shallow(<VerticalParent />)
        .dive() // ControllerContext
        .dive() // ParentWithContext
        .shallow()
        .instance();

      parentWithContextComp.state.tree.push = jest.fn();
      parentWithContextComp.addChildToTree(<Child />);

      expect(parentWithContextComp.state.tree.push).toHaveBeenCalled();
    });
  });

  describe("DeleteChildFromTree", () => {
    describe("when the deleted Child has the focus", () => {
      const onFocusMock = jest.fn();
      const comp = mount(
        <VerticalParent>
          <Child onFocus={onFocusMock} />
          <Child />
        </VerticalParent>
      );

      const parent = comp.find(ParentWithContext).instance();
      const child = comp
        .find(Child)
        .first()
        .instance();

      const child2 = comp
        .find(Child)
        .at(1)
        .instance();

      parent.setState({ tree: [child, child2] });
      parent.currentFocus = 1;
      parent.hasFocusInController = () => true;
      parent.deleteChildFromTree(child2);

      it("executes the onFocus on the child that receives the focus", () => {
        expect(onFocusMock).toBeCalled();
      });
    });

    describe("when the deleted Child has the focus and it's the only child", () => {
      const comp = mount(
        <VerticalParent>
          <Child />
        </VerticalParent>
      );

      const parent = comp.find(ParentWithContext).instance();
      const child = comp
        .find(Child)
        .first()
        .instance();

      parent.setState({ tree: [child] });
      parent.currentFocus = 0;
      parent.hasFocusInController = () => true;
      parent.deleteChildFromTree(child);

      it("executes findAnotherParent in order to move the focus to other parent since there are not children", () => {
        expect(parent.props.context.findAnotherParent).toBeCalled();
      });
    });

    describe("when the deleted Child does not have the focus and the focus position is higher than current focus", () => {
      const onFocusMock = jest.fn();
      const onBlurMock = jest.fn();

      const comp = mount(
        <VerticalParent>
          <Child />
          <Child onFocus={onFocusMock} />
          <Child onBlur={onBlurMock} />
        </VerticalParent>
      );

      const parent = comp.find(ParentWithContext).instance();
      const child = comp
        .find(Child)
        .first()
        .instance();

      const child2 = comp
        .find(Child)
        .at(1)
        .instance();

      const child3 = comp
        .find(Child)
        .at(2)
        .instance();

      parent.setState({ tree: [child, child2, child3] });
      parent.currentFocus = 0;
      parent.hasFocusInController = () => true;
      parent.deleteChildFromTree(child3);

      it("does not execute the onFocus and onBlur on the child that receives the focus", () => {
        expect(onFocusMock).not.toBeCalled();
        expect(onBlurMock).not.toBeCalled();
      });
    });

    describe("when the deleted Child does not have the focus", () => {
      const onFocusMock = jest.fn();
      const onBlurMock = jest.fn();

      const comp = mount(
        <VerticalParent>
          <Child />
          <Child onFocus={onFocusMock} />
          <Child onBlur={onBlurMock} />
        </VerticalParent>
      );

      const parent = comp.find(ParentWithContext).instance();
      const child = comp
        .find(Child)
        .first()
        .instance();

      const child2 = comp
        .find(Child)
        .at(1)
        .instance();

      const child3 = comp
        .find(Child)
        .at(2)
        .instance();

      parent.setState({ tree: [child, child2, child3] });
      parent.currentFocus = 2;
      parent.hasFocusInController = () => true;
      parent.deleteChildFromTree(child);

      it("executes the onFocus and onblur on the child that receives the focus", () => {
        expect(onFocusMock).toBeCalled();
        expect(onBlurMock).toBeCalled();
      });
    });

    describe("when the deleted Child does not have the focus and onFocus is not defined", () => {
      const onFocusMock = jest.fn();
      const onBlurMock = jest.fn();

      const comp = mount(
        <VerticalParent>
          <Child />
          <Child onFocusFake={onFocusMock} />
          <Child onBlurFake={onBlurMock} />
        </VerticalParent>
      );

      const parent = comp.find(ParentWithContext).instance();
      const child = comp
        .find(Child)
        .first()
        .instance();

      const child2 = comp
        .find(Child)
        .at(1)
        .instance();

      const child3 = comp
        .find(Child)
        .at(2)
        .instance();

      parent.setState({ tree: [child, child2, child3] });
      parent.currentFocus = 2;
      parent.hasFocusInController = () => true;
      parent.deleteChildFromTree(child);

      it("does not execute the onFocus and onBlur on the child that receives the focus", () => {
        expect(onFocusMock).not.toBeCalled();
        expect(onBlurMock).not.toBeCalled();
      });
    });
  });
});
