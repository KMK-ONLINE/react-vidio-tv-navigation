import React from "react";
import Controller from "../src/controller";
import { VerticalParent, HorizontalParent, MatrixParent } from "../src/parent";
import { Child } from "../src/child";
import {
  HORIZONTAL,
  VERTICAL,
  MATRIX,
  DEFAULT,
  DOWN,
  RIGHT,
  LEFT,
  UP,
  POSITIVE,
  NEGATIVE
} from "../src/const";
import { shallow, mount } from "enzyme";

describe("Controller tests", () => {
  describe("Constructor", () => {
    it("should initialise the state", () => {
      const comp = shallow(<Controller />);
      expect(comp.state().tree).toEqual([]);
      expect(comp.state().currentFocus).toBe(0);
    });
  });

  describe("ComponentDidMount", () => {
    it("should set the defaultFocus", () => {
      const spy = jest.spyOn(Controller.prototype, "setParentFocus");
      const comp = shallow(<Controller />);
      expect(spy).toHaveBeenCalledWith(comp.state().currentFocus);
      spy.mockReset();
      spy.mockRestore();
    });

    it("should set a listener for the keyDown event", () => {
      const spy = jest.spyOn(window, "addEventListener");
      const spy2 = jest.spyOn(Controller.prototype.onKeyDown, "bind");
      shallow(<Controller />);
      expect(spy).toBeCalled();
      expect(spy2).toBeCalled();
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe("ComponentWillUnmount", () => {
    it("should remove thelistener for the keyDown event", () => {
      const spy = jest.spyOn(window, "removeEventListener");
      mount(<Controller />).unmount();
      expect(spy).toBeCalled();
      spy.mockReset();
      spy.mockRestore();
    });
  });

  describe("SetParentFocus", () => {
    it("sets the new currentFocus on the parent's tree", () => {
      const nextFocus = 1;
      const comp = mount(<Controller />);
      comp.instance().setParentFocus(nextFocus);
      expect(comp.state().currentFocus).toBe(nextFocus);
      comp.unmount();
    });

    it("moves the focus in Parent if Parent has focusable children", () => {
      const moveFocusInParentMock = jest.fn();
      const parent = shallow(<VerticalParent />);
      const comp = mount(<Controller />);
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.setState({ tree: [parent] });
      comp.instance().setParentFocus(0);
      expect(moveFocusInParentMock).toHaveBeenCalled();
      expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
      expect(moveFocusInParentMock.mock.calls[0][1]).toBe(DEFAULT);
      comp.unmount();
    });
  });

  describe("MoveFocusInParent", () => {
    describe("When direction is DEFAULT", () => {
      it("sets the current child focus on the child", () => {
        const setFocusInParentMock = jest.fn();
        const parent = mount(<VerticalParent />);
        const comp = mount(<Controller />);
        const currentFocus = 0;
        parent.setState({ currentFocus: currentFocus });
        parent.state = parent.state();
        comp.instance().setFocusInParent = setFocusInParentMock;
        comp.setState({ tree: [parent] });
        comp.instance().moveFocusInParent(parent, DEFAULT);
        expect(setFocusInParentMock).toHaveBeenCalled();
        expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
        expect(setFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
        comp.unmount();
      });
    });

    describe("When direction is NEGATIVE", () => {
      describe("When currentFocus is <= 0", () => {
        it("does not quit the focus from the child and sets the focus in the previous child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />);
          const comp = mount(<Controller />);
          const currentFocus = 0;
          parent.setState({ currentFocus: currentFocus });
          parent.state = parent.state(); // This is shit (facepalm)
          comp.instance().setFocusInParent = setFocusInParentMock;
          comp.instance().quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.instance().moveFocusInParent(parent, NEGATIVE);
          expect(quitFocusInParentMock).not.toHaveBeenCalled();
          expect(setFocusInParentMock).not.toHaveBeenCalled();
          comp.unmount();
        });
      });

      describe("When there is not threeshold", () => {
        it("quits the focus from the child and sets the focus in the previous child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />);
          const comp = mount(<Controller />);
          const currentFocus = 1;
          parent.setState({ currentFocus: currentFocus });
          parent.state = parent.state(); // This is shit (facepalm)
          comp.instance().setFocusInParent = setFocusInParentMock;
          comp.instance().quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.instance().moveFocusInParent(parent, NEGATIVE);
          expect(quitFocusInParentMock).toHaveBeenCalled();
          expect(quitFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(quitFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
          expect(setFocusInParentMock).toHaveBeenCalled();
          expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(setFocusInParentMock.mock.calls[0][1]).toBe(currentFocus - 1);
          comp.unmount();
        });
      });

      describe("When there is threeshold", () => {
        it("quits the focus from the child and sets the focus in the previous child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />);
          const comp = mount(<Controller />);
          const currentFocus = 1;
          const threeshold = 1;
          parent.setState({ currentFocus: currentFocus });
          parent.state = parent.state(); // This is shit (facepalm)
          comp.instance().setFocusInParent = setFocusInParentMock;
          comp.instance().quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.instance().moveFocusInParent(parent, NEGATIVE, threeshold);
          expect(quitFocusInParentMock).toHaveBeenCalled();
          expect(quitFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(quitFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
          expect(setFocusInParentMock).toHaveBeenCalled();
          expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(setFocusInParentMock.mock.calls[0][1]).toBe(
            currentFocus - threeshold
          );
          comp.unmount();
        });
      });
    });

    describe("When direction is POSITIVE", () => {
      describe("When currentFocus > number of childrem", () => {
        it("quits the focus from the child and sets the focus in the next child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />);
          const child = shallow(<Child />);
          const comp = mount(<Controller />);
          const currentFocus = 1;
          parent.setState({ currentFocus: currentFocus, tree: [child, child] });
          parent.state = parent.state(); // This is shit (facepalm)
          comp.instance().setFocusInParent = setFocusInParentMock;
          comp.instance().quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.instance().moveFocusInParent(parent, POSITIVE);
          expect(quitFocusInParentMock).not.toHaveBeenCalled();
          expect(setFocusInParentMock).not.toHaveBeenCalled();
          comp.unmount();
        });
      });

      describe("When there is not threeshold", () => {
        it("quits the focus from the child and sets the focus in the next child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />);
          const child = shallow(<Child />);
          const comp = mount(<Controller />);
          const currentFocus = 0;
          parent.setState({ currentFocus: currentFocus, tree: [child, child] });
          parent.state = parent.state(); // This is shit (facepalm)
          comp.instance().setFocusInParent = setFocusInParentMock;
          comp.instance().quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.instance().moveFocusInParent(parent, POSITIVE);
          expect(quitFocusInParentMock).toHaveBeenCalled();
          expect(quitFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(quitFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
          expect(setFocusInParentMock).toHaveBeenCalled();
          expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(setFocusInParentMock.mock.calls[0][1]).toBe(currentFocus + 1);
          comp.unmount();
        });
      });

      describe("When there is threeshold", () => {
        it("quits the focus from the child and sets the focus in the next child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />);
          const child = shallow(<Child />);
          const comp = mount(<Controller />);
          const currentFocus = 0;
          const threeshold = 1;
          parent.setState({ currentFocus: currentFocus, tree: [child, child] });
          parent.state = parent.state(); // This is shit (facepalm)
          comp.instance().setFocusInParent = setFocusInParentMock;
          comp.instance().quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.instance().moveFocusInParent(parent, POSITIVE, threeshold);
          expect(quitFocusInParentMock).toHaveBeenCalled();
          expect(quitFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(quitFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
          expect(setFocusInParentMock).toHaveBeenCalled();
          expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(setFocusInParentMock.mock.calls[0][1]).toBe(
            currentFocus + threeshold
          );
          comp.unmount();
        });
      });
    });
  });

  describe("OnKeyDown", () => {
    describe("When is not ENTER", () => {
      it("calls handleFocus", () => {
        const handleFocusMock = jest.fn();
        const event = {
          keyCode: 38
        };
        const comp = shallow(<Controller />);
        comp.instance().handleFocus = handleFocusMock;
        comp.instance().onKeyDown(event);
        expect(handleFocusMock).toHaveBeenCalled();
      });
    });
    describe("When is ENTER", () => {
      it("calls handleFocus and handleEnter", () => {
        const handleFocusMock = jest.fn();
        const handleEnterMock = jest.fn();
        const event = {
          keyCode: 13 // this is the code associated to ENTER ( controller.js@22)
        };
        const comp = shallow(<Controller />);
        comp.instance().handleFocus = handleFocusMock;
        comp.instance().handleEnter = handleEnterMock;
        comp.instance().onKeyDown(event);
        expect(handleFocusMock).toHaveBeenCalled();
        expect(handleEnterMock).toHaveBeenCalled();
      });
    });
  });

  describe("CanMoveToPreviousParent", () => {
    const comp = shallow(
      <Controller>
        <VerticalParent />
        <VerticalParent />
      </Controller>
    );

    it("can not move to the previous parent if the focus is in the first parent", () => {
      comp.setState({ currentFocus: 0 });
      expect(comp.instance().canMoveToPreviousParent()).toBeFalsy();
    });

    it("can moves to the previous parent if the focus is not the first parent", () => {
      comp.setState({ currentFocus: 1 });
      expect(comp.instance().canMoveToPreviousParent()).toBeTruthy();
    });
  });

  describe("CanMoveToNextParent", () => {
    const comp = shallow(<Controller />);

    it("returns true if the focus is not in the last parent", () => {
      comp.setState({
        currentFocus: 0,
        tree: [VerticalParent, VerticalParent]
      });
      expect(comp.instance().canMoveToNextParent()).toBeTruthy();
    });

    it("returns false if the focus is in the last parent", () => {
      comp.setState({
        currentFocus: 1,
        tree: [VerticalParent, VerticalParent]
      });
      expect(comp.instance().canMoveToNextParent()).toBeFalsy();
    });
  });

  describe("focusInParentOnInitEdge", () => {
    const comp = shallow(<Controller />);

    it("returns true if the focus is in the first element", () => {
      const parent1 = shallow(<VerticalParent />);
      parent1.setState({ currentFocus: 0, tree: [Child, Child] });
      parent1.state = parent1.state();

      comp.setState({
        currentFocus: 0,
        tree: [parent1]
      });
      expect(comp.instance().focusInParentOnInitEdge()).toBeTruthy();
    });

    it("returns false if the focus is not in the first element", () => {
      const parent1 = shallow(<VerticalParent />);
      parent1.setState({ currentFocus: 1, tree: [Child, Child] });
      parent1.state = parent1.state();

      comp.setState({
        currentFocus: 0,
        tree: [parent1]
      });
      expect(comp.instance().focusInParentOnInitEdge()).toBeFalsy();
    });
  });

  describe("focusInParentOnFinalEdge", () => {
    const comp = shallow(<Controller />);

    it("returns true if the focus is in the last element", () => {
      const parent1 = shallow(<VerticalParent />);
      parent1.setState({ currentFocus: 1, tree: [Child, Child] });
      parent1.state = parent1.state();

      comp.setState({
        currentFocus: 0,
        tree: [parent1]
      });
      expect(comp.instance().focusInParentOnFinalEdge()).toBeTruthy();
    });

    it("returns false if the focus is not in the last element", () => {
      const parent1 = shallow(<VerticalParent />);
      parent1.setState({ currentFocus: 0, tree: [Child, Child] });
      parent1.state = parent1.state();

      comp.setState({
        currentFocus: 0,
        tree: [parent1]
      });
      expect(comp.instance().focusInParentOnFinalEdge()).toBeFalsy();
    });
  });

  describe("HandleEnter", () => {
    describe("When onEnter is defined on the component that has the focus", () => {
      it("calls onEnter", () => {
        const onEnterMock = jest.fn();
        const currentFocus = 0;
        const comp = shallow(<Controller />);
        const parent = shallow(<VerticalParent />);
        const child = mount(<Child onEnter={onEnterMock} />);
        child.props = child.props();
        comp.setState({ currentFocus: currentFocus, tree: [parent] });
        comp.state = comp.state();
        parent.setState({ currentFocus: currentFocus, tree: [child, child] });
        parent.state = parent.state();
        comp.instance().handleEnter();
        expect(onEnterMock).toHaveBeenCalled();
        child.unmount();
      });
    });

    describe("When onEnter is not defined on the component that has the focus", () => {
      it("does not call onEnter", () => {
        const onEnterMock = jest.fn();
        const currentFocus = 0;
        const comp = shallow(<Controller />);
        const parent = shallow(<VerticalParent />);
        const child = mount(<Child />);
        child.props = child.props();
        comp.setState({ currentFocus: currentFocus, tree: [parent] });
        comp.state = comp.state();
        parent.setState({ currentFocus: currentFocus, tree: [child, child] });
        parent.state = parent.state();
        comp.instance().handleEnter();
        expect(onEnterMock).not.toHaveBeenCalled();
        child.unmount();
      });
    });
  });

  describe("HandleFocus", () => {
    describe("When direction is HORIZONTAL", () => {
      it("calls handleFocusInHorizontalParent", () => {
        const handleFocusInHorizontalParentMock = jest.fn();
        const currentFocus = 0;
        const comp = shallow(<Controller />);
        const parent = shallow(<HorizontalParent />);
        parent.setState({ type: HORIZONTAL });
        parent.state = parent.state();
        comp.instance().handleFocusInHorizontalParent = handleFocusInHorizontalParentMock;
        comp.setState({ currentFocus: currentFocus, tree: [parent] });
        comp.state = comp.state();
        comp.instance().handleFocus(HORIZONTAL);
        expect(handleFocusInHorizontalParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is VERTICAL", () => {
      it("calls handleFocusInVerticalParent", () => {
        const handleFocusInVerticalParentMock = jest.fn();
        const currentFocus = 0;
        const comp = shallow(<Controller />);
        const parent = shallow(<VerticalParent />);
        parent.setState({ type: VERTICAL });
        parent.state = parent.state();
        comp.instance().handleFocusInVerticalParent = handleFocusInVerticalParentMock;
        comp.setState({ currentFocus: currentFocus, tree: [parent] });
        comp.state = comp.state();
        comp.instance().handleFocus(VERTICAL);
        expect(handleFocusInVerticalParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is MATRIX", () => {
      it("calls handleFocusInMatrixParent", () => {
        const handleFocusInMatrixParentMock = jest.fn();
        const currentFocus = 0;
        const comp = shallow(<Controller />);
        const parent = shallow(<MatrixParent />);
        parent.setState({ type: MATRIX });
        parent.state = parent.state();
        comp.instance().handleFocusInMatrixParent = handleFocusInMatrixParentMock;
        comp.setState({ currentFocus: currentFocus, tree: [parent] });
        comp.state = comp.state();
        comp.instance().handleFocus(MATRIX);
        expect(handleFocusInMatrixParentMock).toHaveBeenCalled();
      });
    });
  });

  describe("SetFocusInParent", () => {
    describe("When onFocus is defined on the Parent", () => {
      const onFocusMock = jest.fn();
      const currentFocus = 0;
      const focusIndex = 0;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent onFocus={onFocusMock} />);
      const child = mount(<Child />);
      child.props = child.props();
      comp.setState({ currentFocus: currentFocus, tree: [parent] });
      comp.state = comp.state();
      parent.setState({ currentFocus: currentFocus, tree: [child, child] });
      parent.state = parent.state();
      parent.props = parent.props();
      comp.instance().setFocusInParent(parent, focusIndex);

      it("calls onFocus", () => {
        expect(onFocusMock).toHaveBeenCalled();
        child.unmount();
      });
    });

    describe("When onFocus is not defined on the Parent", () => {
      const onFocusMock = jest.fn();
      const currentFocus = 0;
      const focusIndex = 0;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent />);
      const child = mount(<Child />);
      child.props = child.props();
      comp.setState({ currentFocus: currentFocus, tree: [parent] });
      comp.state = comp.state();
      parent.setState({ currentFocus: currentFocus, tree: [child, child] });
      parent.state = parent.state();
      parent.props = parent.props();
      comp.instance().setFocusInParent(parent, focusIndex);

      it("does not call onFocus", () => {
        expect(onFocusMock).not.toHaveBeenCalled();
        child.unmount();
      });
    });

    describe("When onFocus is defined on the child with the focus", () => {
      const onFocusMock = jest.fn();
      const currentFocus = 0;
      const focusIndex = 0;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent />);
      const child = mount(<Child onFocus={onFocusMock} />);
      child.props = child.props();
      comp.setState({ currentFocus: currentFocus, tree: [parent] });
      comp.state = comp.state();
      parent.setState({ currentFocus: currentFocus, tree: [child, child] });
      parent.state = parent.state();
      comp.instance().setFocusInParent(parent, focusIndex);

      it("calls onFocus", () => {
        expect(onFocusMock).toHaveBeenCalled();
        child.unmount();
      });

      it("sets the parent's currentFocus as focusIndex", () => {
        expect(parent.state.currentFocus).toBe(currentFocus);
      });
    });

    describe("When onFocus is not defined on the child with the focus", () => {
      const onFocusMock = jest.fn();
      const currentFocus = 0;
      const focusIndex = 0;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent />);
      const child = mount(<Child />);
      child.props = child.props();
      comp.setState({ currentFocus: currentFocus, tree: [parent] });
      comp.state = comp.state();
      parent.setState({ currentFocus: currentFocus, tree: [child, child] });
      parent.state = parent.state();
      comp.instance().setFocusInParent(parent, focusIndex);

      it("does not call onFocus", () => {
        expect(onFocusMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("QuitFocusInParent", () => {
    describe("When onBlur is defined on the Parent", () => {
      const onBlurMock = jest.fn();
      const currentFocus = 0;
      const focusIndex = 0;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent onBlur={onBlurMock} />);
      const child = mount(<Child />);
      child.props = child.props();
      comp.setState({ currentFocus: currentFocus, tree: [parent] });
      comp.state = comp.state();
      parent.setState({ currentFocus: currentFocus, tree: [child, child] });
      parent.state = parent.state();
      parent.props = parent.props();
      comp.instance().quitFocusInParent(parent, focusIndex);

      it("calls onBlur", () => {
        expect(onBlurMock).toHaveBeenCalled();
        child.unmount();
      });
    });

    describe("When onBlur is not defined on the Parent", () => {
      const onBlurMock = jest.fn();
      const currentFocus = 0;
      const focusIndex = 0;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent />);
      const child = mount(<Child />);
      child.props = child.props();
      comp.setState({ currentFocus: currentFocus, tree: [parent] });
      comp.state = comp.state();
      parent.setState({ currentFocus: currentFocus, tree: [child, child] });
      parent.state = parent.state();
      parent.props = parent.props();
      comp.instance().quitFocusInParent(parent, focusIndex);

      it("does not call onBlur", () => {
        expect(onBlurMock).not.toHaveBeenCalled();
        child.unmount();
      });
    });

    describe("When onBlur is defined on the child with the focus", () => {
      const onBlurMock = jest.fn();
      const currentFocus = 0;
      const focusIndex = 0;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent />);
      const child = mount(<Child onBlur={onBlurMock} />);
      child.props = child.props();
      comp.setState({ currentFocus: currentFocus, tree: [parent] });
      comp.state = comp.state();
      parent.setState({ currentFocus: currentFocus, tree: [child, child] });
      parent.state = parent.state();
      comp.instance().quitFocusInParent(parent, focusIndex);

      it("calls onFocus", () => {
        expect(onBlurMock).toHaveBeenCalled();
        child.unmount();
      });

      it("sets the parent's currentFocus as focusIndex", () => {
        expect(parent.state.currentFocus).toBe(currentFocus);
      });
    });

    describe("When onBlur is not defined on the child with the focus", () => {
      const onBlurMock = jest.fn();
      const currentFocus = 0;
      const focusIndex = 0;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent />);
      const child = mount(<Child />);
      child.props = child.props();
      comp.setState({ currentFocus: currentFocus, tree: [parent] });
      comp.state = comp.state();
      parent.setState({ currentFocus: currentFocus, tree: [child, child] });
      parent.state = parent.state();
      comp.instance().quitFocusInParent(parent, focusIndex);

      it("does not call onFocus", () => {
        expect(onBlurMock).not.toHaveBeenCalled();
        child.unmount();
      });
    });
  });

  describe("HandleFocusInVerticalParent", () => {
    describe("When direction is LEFT and currentFocus > 0", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const currentFocus = 1;
      const direction = LEFT;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent />);
      parent.state = { currentFocus: 0 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().quitFocusInParent = quitFocusInParentMock;
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.instance().handleFocusInVerticalParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("updates the state with the new focus", () => {
        expect(comp.instance().state.currentFocus).toBe(currentFocus - 1);
      });

      it("moves the focus to the current focus", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is RIGHT and currentFocus < parent's children lenght minus 1", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const currentFocus = 0;
      const direction = RIGHT;
      const comp = shallow(<Controller />);
      const parent = shallow(<VerticalParent />);
      parent.state = { currentFocus: 0 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().quitFocusInParent = quitFocusInParentMock;
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.instance().handleFocusInVerticalParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("updates the state with the new focus", () => {
        expect(comp.instance().state.currentFocus).toBe(currentFocus + 1);
      });

      it("moves the focus to the current focus", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is DOWN", () => {
      describe("and it's not in the last element of the tree and it's not the final parent", () => {
        const moveFocusInParentMock = jest.fn();
        const currentFocus = 0;
        const direction = DOWN;
        const comp = shallow(<Controller />);
        const parent = shallow(<VerticalParent />);
        const children = shallow(<Child />);
        parent.state = { currentFocus: 0, tree: [children, children] };
        comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
        comp.state = comp.state();
        comp.instance().moveFocusInParent = moveFocusInParentMock;
        comp.instance().handleFocusInVerticalParent(direction);

        it("moves the focus to the next element inside the same parent", () => {
          expect(moveFocusInParentMock).toHaveBeenCalled();
          expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(moveFocusInParentMock.mock.calls[0][1]).toBe(POSITIVE);
        });
      });

      describe("and it's in the last element of the tree and it's the final parent", () => {
        const moveFocusInTreeMock = jest.fn();
        const currentFocus = 0;
        const direction = DOWN;
        const comp = shallow(<Controller />);
        const parent1 = shallow(<VerticalParent />);
        const parent2 = shallow(<HorizontalParent />);
        const children = shallow(<Child />);
        parent1.state = { currentFocus: 1, tree: [children, children] };
        parent2.state = { currentFocus: 0, tree: [children, children] };
        comp.setState({ currentFocus: currentFocus, tree: [parent1, parent2] });
        comp.state = comp.state();
        comp.instance().moveFocusInTree = moveFocusInTreeMock;
        comp.instance().handleFocusInVerticalParent(direction);

        it("moves the focus to the next parent", () => {
          expect(moveFocusInTreeMock).toHaveBeenCalled();
          expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(POSITIVE);
        });
      });
    });

    describe("When direction is UP", () => {
      describe("and it's not the first element of the tree and it's the last parent", () => {
        const moveFocusInParentMock = jest.fn();
        const currentFocus = 0;
        const direction = UP;
        const comp = shallow(<Controller />);
        const parent = shallow(<VerticalParent />);
        parent.state = { currentFocus: 0 };
        comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
        comp.state = comp.state();
        comp.instance().moveFocusInParent = moveFocusInParentMock;
        comp.instance().handleFocusInVerticalParent(direction);

        it("moves the focus to the current focus", () => {
          expect(moveFocusInParentMock).toHaveBeenCalled();
          expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(moveFocusInParentMock.mock.calls[0][1]).toBe(NEGATIVE);
        });
      });

      describe("and it's on the first element of the parent and it's not last parent", () => {
        const moveFocusInTreeMock = jest.fn();
        const currentFocus = 1;
        const direction = UP;
        const comp = shallow(<Controller />);
        const parent1 = shallow(<HorizontalParent />);
        const parent2 = shallow(<VerticalParent />);
        const children = shallow(<Child />);
        parent1.state = { currentFocus: 1, tree: [children, children] };
        parent2.state = { currentFocus: 0, tree: [children, children] };
        comp.setState({ currentFocus: currentFocus, tree: [parent1, parent2] });
        comp.state = comp.state();
        comp.instance().moveFocusInTree = moveFocusInTreeMock;
        comp.instance().handleFocusInVerticalParent(direction);

        it("moves the focus to the previous parent", () => {
          expect(moveFocusInTreeMock).toHaveBeenCalled();
          expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(NEGATIVE);
        });
      });
    });
  });

  describe("HandleFocusInHorizontalParent", () => {
    describe("When direction is UP and currentFocus > 0", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const currentFocus = 1;
      const direction = UP;
      const comp = shallow(<Controller />);
      const parent = shallow(<HorizontalParent />);
      parent.state = { currentFocus: 0 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().quitFocusInParent = quitFocusInParentMock;
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.instance().handleFocusInHorizontalParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("updates the state with the new focus", () => {
        expect(comp.instance().state.currentFocus).toBe(currentFocus - 1);
      });

      it("moves the focus to the current focus", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is DOWN and currentFocus < parent's children lenght minus 1", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const currentFocus = 0;
      const direction = DOWN;
      const comp = shallow(<Controller />);
      const parent = shallow(<HorizontalParent />);
      parent.state = { currentFocus: 0 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().quitFocusInParent = quitFocusInParentMock;
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.instance().handleFocusInHorizontalParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("updates the state with the new focus", () => {
        expect(comp.instance().state.currentFocus).toBe(currentFocus + 1);
      });

      it("moves the focus to the current focus", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is RIGHT", () => {
      describe("and there are not more parents or it's not in the last element", () => {
        const moveFocusInParentMock = jest.fn();
        const currentFocus = 0;
        const direction = RIGHT;
        const comp = shallow(<Controller />);
        const parent = shallow(<HorizontalParent />);
        const children = shallow(<Child />);
        parent.state = { currentFocus: 0, tree: [children, children] };
        comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
        comp.state = comp.state();
        comp.instance().moveFocusInParent = moveFocusInParentMock;
        comp.instance().handleFocusInHorizontalParent(direction);

        it("moves the focus to the next element", () => {
          expect(moveFocusInParentMock).toHaveBeenCalled();
          expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(moveFocusInParentMock.mock.calls[0][1]).toBe(POSITIVE);
        });
      });

      describe("and there are more parents or it's in the last element", () => {
        const moveFocusInTreeMock = jest.fn();
        const currentFocus = 0;
        const direction = RIGHT;
        const comp = shallow(<Controller />);
        const parent1 = shallow(<HorizontalParent />);
        const parent2 = shallow(<VerticalParent />);
        const children = shallow(<Child />);
        parent1.state = { currentFocus: 1, tree: [children, children] };
        parent2.state = { currentFocus: 0, tree: [children, children] };
        comp.setState({ currentFocus: currentFocus, tree: [parent1, parent2] });
        comp.state = comp.state();
        comp.instance().moveFocusInTree = moveFocusInTreeMock;
        comp.instance().handleFocusInHorizontalParent(direction);

        it("moves the focus to the next parent", () => {
          expect(moveFocusInTreeMock).toHaveBeenCalled();
          expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(POSITIVE);
        });
      });
    });

    describe("When direction is LEFT", () => {
      describe("and it's in the first parent or it's not in the first element", () => {
        const moveFocusInParentMock = jest.fn();
        const currentFocus = 0;
        const direction = LEFT;
        const comp = shallow(<Controller />);
        const parent = shallow(<HorizontalParent />);
        parent.state = { currentFocus: 0 };
        comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
        comp.state = comp.state();
        comp.instance().moveFocusInParent = moveFocusInParentMock;
        comp.instance().handleFocusInHorizontalParent(direction);

        it("moves the focus to the current focus", () => {
          expect(moveFocusInParentMock).toHaveBeenCalled();
          expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(moveFocusInParentMock.mock.calls[0][1]).toBe(NEGATIVE);
        });
      });

      describe("and it's not in the first parent and it's in the first element", () => {
        const moveFocusInTreeMock = jest.fn();
        const currentFocus = 1;
        const direction = LEFT;
        const comp = shallow(<Controller />);
        const parent1 = shallow(<VerticalParent />);
        const parent2 = shallow(<HorizontalParent />);
        const children = shallow(<Child />);
        parent1.state = { currentFocus: 0, tree: [children, children] };
        parent2.state = { currentFocus: 0, tree: [children, children] };
        comp.setState({ currentFocus: currentFocus, tree: [parent1, parent2] });
        comp.state = comp.state();
        comp.instance().moveFocusInTree = moveFocusInTreeMock;
        comp.instance().handleFocusInHorizontalParent(direction);

        it("moves the focus to the next parent", () => {
          expect(moveFocusInTreeMock).toHaveBeenCalled();
          expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(NEGATIVE);
        });
      });
    });
  });

  describe("HandleFocusInMatrixParent", () => {
    describe("When direction is RIGHT and the currentFocus is not on the right edge", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const currentFocus = 1;
      const direction = RIGHT;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={40} rows={10} />);
      parent.state = { currentFocus: 0 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().quitFocusInParent = quitFocusInParentMock;
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("moves the focus to the current focus", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is RIGHT and the currentFocus is on the right edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 0;
      const direction = RIGHT;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={10} rows={10} />);
      parent.state = { currentFocus: 9, columns: 10, rows: 10 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInTree = moveFocusInTreeMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("moves the focus to the next parent if there is a next parent", () => {
        expect(moveFocusInTreeMock).toHaveBeenCalled();
        expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(POSITIVE);
      });
    });

    describe("When direction is RIGHT and the currentFocus is on the right edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 1;
      const direction = RIGHT;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={10} rows={10} />);
      parent.state = { currentFocus: 9, columns: 10, rows: 10 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInTree = moveFocusInTreeMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("does not move if there is not next parent", () => {
        expect(moveFocusInTreeMock).not.toHaveBeenCalled();
      });
    });

    describe("When direction is LEFT and currentFocus is not on the left edge", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const currentFocus = 0;
      const direction = LEFT;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={40} rows={10} />);
      parent.state = { currentFocus: 0 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().quitFocusInParent = quitFocusInParentMock;
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("moves the focus to the current focus", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is LEFT and the currentFocus is on the left edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 1;
      const direction = LEFT;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={10} rows={10} />);
      parent.state = { currentFocus: 0, columns: 10, rows: 10 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInTree = moveFocusInTreeMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("moves the focus to the previous parent", () => {
        expect(moveFocusInTreeMock).toHaveBeenCalled();
        expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(NEGATIVE);
      });
    });

    describe("When direction is LEFT and the currentFocus is on the left edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 0;
      const direction = LEFT;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={10} rows={10} />);
      parent.state = { currentFocus: 0, columns: 10, rows: 10 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInTree = moveFocusInTreeMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("does not move the focus to the previous parent if there is not previous parent", () => {
        expect(moveFocusInTreeMock).not.toHaveBeenCalled();
      });
    });

    describe("When direction is DOWN", () => {
      const moveFocusInParentMock = jest.fn();
      const quitFocusInParentMock = jest.fn();
      const currentFocus = 0;
      const direction = DOWN;
      const comp = shallow(<Controller />);
      const parent = mount(<MatrixParent columns={40} rows={10} />);
      parent.state = { currentFocus: 0, columns: 40, rows: 40 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.instance().quitFocusInParent = quitFocusInParentMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("deletes the focus to the current focus", () => {
        expect(quitFocusInParentMock).toBeCalled();
        parent.unmount();
      });

      it("moves the focus to the current focus", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
        expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
        expect(moveFocusInParentMock.mock.calls[0][1]).toBe(POSITIVE);
      });
    });

    describe("When direction is DOWN and the currentFocus is on the final edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 0;
      const direction = DOWN;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={10} rows={10} />);
      parent.state = { currentFocus: 90, columns: 10, rows: 10 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInTree = moveFocusInTreeMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("moves the focus to the next parent", () => {
        expect(moveFocusInTreeMock).toHaveBeenCalled();
        expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(POSITIVE);
      });
    });

    describe("When direction is DOWN and the currentFocus is on the final edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 1;
      const direction = DOWN;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={10} rows={10} />);
      parent.state = { currentFocus: 90, columns: 10, rows: 10 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInTree = moveFocusInTreeMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("does not move the focus to the next parent if there is not next parent", () => {
        expect(moveFocusInTreeMock).not.toHaveBeenCalled();
      });
    });

    describe("When direction is UP", () => {
      const moveFocusInParentMock = jest.fn();
      const quitFocusInParentMock = jest.fn();
      const currentFocus = 0;
      const direction = UP;
      const comp = shallow(<Controller />);
      const parent = mount(<MatrixParent columns={40} rows={10} />);
      parent.state = { currentFocus: 41, columns: 40, rows: 40 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.instance().quitFocusInParent = quitFocusInParentMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("deletes the focus to the current focus", () => {
        expect(quitFocusInParentMock).toBeCalled();
        parent.unmount();
      });

      it("moves the focus to the current focus", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
        expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
        expect(moveFocusInParentMock.mock.calls[0][1]).toBe(NEGATIVE);
      });
    });

    describe("When direction is UP and the currentFocus is on the init edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 1;
      const direction = UP;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={10} rows={10} />);
      parent.state = { currentFocus: 0, columns: 10, rows: 10 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInTree = moveFocusInTreeMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("moves the focus to the previous parent", () => {
        expect(moveFocusInTreeMock).toHaveBeenCalled();
        expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(NEGATIVE);
      });
    });

    describe("When direction is UP and the currentFocus is on the init edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 0;
      const direction = UP;
      const comp = shallow(<Controller />);
      const parent = shallow(<MatrixParent columns={10} rows={10} />);
      parent.state = { currentFocus: 0, columns: 10, rows: 10 };
      comp.setState({ currentFocus: currentFocus, tree: [parent, parent] });
      comp.state = comp.state();
      comp.instance().moveFocusInTree = moveFocusInTreeMock;
      comp.instance().handleFocusInMatrixParent(direction);

      it("does not move the focus to the previous parent if there is not previous parent", () => {
        expect(moveFocusInTreeMock).not.toHaveBeenCalled();
      });
    });
  });
});
