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
    });

    it("should initlize the currentFocus", () => {
      const comp = shallow(<Controller />);
      expect(comp.instance().currentFocus).toBe(0);
    });
  });

  describe("ComponentDidMount", () => {
    it("should set the defaultFocus", () => {
      const spy = jest.spyOn(Controller.prototype, "setParentFocus");
      const comp = shallow(<Controller />);
      expect(spy).toHaveBeenCalledWith(comp.instance().currentFocus);
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
      const comp = shallow(<Controller />);
      comp.instance().setParentFocus(nextFocus);
      expect(comp.instance().currentFocus).toBe(nextFocus);
    });

    it("moves the focus in Parent if Parent has focusable children", () => {
      const moveFocusInParentMock = jest.fn();
      const parent = shallow(<VerticalParent />).instance();
      const comp = shallow(<Controller />);
      comp.instance().moveFocusInParent = moveFocusInParentMock;
      comp.setState({ tree: [parent] });
      comp.instance().setParentFocus(0);
      expect(moveFocusInParentMock).toHaveBeenCalled();
      expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
      expect(moveFocusInParentMock.mock.calls[0][1]).toBe(DEFAULT);
    });
  });

  describe("SetFocusState", () => {
    it("sets the currentFocus with the value passed", () => {
      const comp = shallow(<Controller />).instance();
      comp.currentFocus = 0;
      comp.setFocusState(2);
      expect(comp.currentFocus).toBe(2);
    });

    it("executes the callback if passed", () => {
      const callback = jest.fn();
      const comp = shallow(<Controller />).instance();
      comp.currentFocus = 0;
      comp.setFocusState(2, callback);
      expect(callback).toHaveBeenCalled();
      expect(callback.mock.calls[0][0]).toBe(2);
    });
  });

  describe("MoveFocusInParent", () => {
    describe("When direction is DEFAULT", () => {
      it("sets the current child focus on the child", () => {
        const setFocusInParentMock = jest.fn();
        const parent = shallow(<VerticalParent />).instance();
        const comp = shallow(<Controller />).instance();
        const currentFocus = 0;
        parent.setState({ tree: [] });
        parent.currentFocus = 0;
        comp.setFocusInParent = setFocusInParentMock;
        comp.setState({ tree: [parent] });
        comp.moveFocusInParent(parent, DEFAULT);
        expect(setFocusInParentMock).toHaveBeenCalled();
        expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
        expect(setFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
      });
    });

    describe("When direction is NEGATIVE", () => {
      describe("When currentFocus is <= 0", () => {
        it("does not quit the focus from the child and sets the focus in the previous child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />).instance();
          const comp = shallow(<Controller />).instance();
          const currentFocus = 0;
          parent.setState({ currentFocus: currentFocus });
          comp.setFocusInParent = setFocusInParentMock;
          comp.quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.moveFocusInParent(parent, NEGATIVE);
          expect(quitFocusInParentMock).not.toHaveBeenCalled();
          expect(setFocusInParentMock).not.toHaveBeenCalled();
        });
      });

      describe("When there is not threeshold", () => {
        it("quits the focus from the child and sets the focus in the previous child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />).instance();
          const comp = shallow(<Controller />).instance();
          const currentFocus = 1;
          parent.currentFocus = currentFocus;
          parent.setState({ tree: [] });
          comp.setFocusInParent = setFocusInParentMock;
          comp.quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.moveFocusInParent(parent, NEGATIVE);
          expect(quitFocusInParentMock).toHaveBeenCalled();
          expect(quitFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(quitFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
          expect(setFocusInParentMock).toHaveBeenCalled();
          expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(setFocusInParentMock.mock.calls[0][1]).toBe(currentFocus - 1);
        });
      });

      describe("When there is threeshold", () => {
        it("quits the focus from the child and sets the focus in the previous child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />).instance();
          const comp = shallow(<Controller />).instance();
          const currentFocus = 1;
          const threeshold = 1;
          parent.currentFocus = currentFocus;
          parent.setState({ tree: [] });
          comp.setFocusInParent = setFocusInParentMock;
          comp.quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.moveFocusInParent(parent, NEGATIVE, threeshold);
          expect(quitFocusInParentMock).toHaveBeenCalled();
          expect(quitFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(quitFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
          expect(setFocusInParentMock).toHaveBeenCalled();
          expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(setFocusInParentMock.mock.calls[0][1]).toBe(
            currentFocus - threeshold
          );
        });
      });
    });

    describe("When direction is POSITIVE", () => {
      describe("When currentFocus > number of childrem", () => {
        it("quits the focus from the child and sets the focus in the next child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />).instance();
          const child = shallow(<Child />).instance();
          const comp = shallow(<Controller />).instance();
          const currentFocus = 1;
          parent.setState({
            currentFocus: currentFocus,
            tree: [child, child]
          });
          comp.setFocusInParent = setFocusInParentMock;
          comp.quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.moveFocusInParent(parent, POSITIVE);
          expect(quitFocusInParentMock).not.toHaveBeenCalled();
          expect(setFocusInParentMock).not.toHaveBeenCalled();
        });
      });

      describe("When there is not threeshold", () => {
        it("quits the focus from the child and sets the focus in the next child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />).instance();
          const child = shallow(<Child />).instance();
          const comp = shallow(<Controller />).instance();
          const currentFocus = 0;
          parent.setState({
            tree: [child, child]
          });
          parent.currentFocus = currentFocus;
          comp.setFocusInParent = setFocusInParentMock;
          comp.quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.moveFocusInParent(parent, POSITIVE);
          expect(quitFocusInParentMock).toHaveBeenCalled();
          expect(quitFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(quitFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
          expect(setFocusInParentMock).toHaveBeenCalled();
          expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(setFocusInParentMock.mock.calls[0][1]).toBe(currentFocus + 1);
        });
      });

      describe("When there is threeshold", () => {
        it("quits the focus from the child and sets the focus in the next child", () => {
          const setFocusInParentMock = jest.fn();
          const quitFocusInParentMock = jest.fn();
          const parent = shallow(<VerticalParent />).instance();
          const child = shallow(<Child />).instance();
          const comp = shallow(<Controller />).instance();
          const currentFocus = 0;
          const threeshold = 1;
          parent.setState({
            tree: [child, child]
          });
          parent.currentFocus = currentFocus;
          comp.setFocusInParent = setFocusInParentMock;
          comp.quitFocusInParent = quitFocusInParentMock;
          comp.setState({ tree: [parent] });
          comp.moveFocusInParent(parent, POSITIVE, threeshold);
          expect(quitFocusInParentMock).toHaveBeenCalled();
          expect(quitFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(quitFocusInParentMock.mock.calls[0][1]).toBe(currentFocus);
          expect(setFocusInParentMock).toHaveBeenCalled();
          expect(setFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(setFocusInParentMock.mock.calls[0][1]).toBe(
            currentFocus + threeshold
          );
        });
      });
    });
  });

  describe("OnKeyDown", () => {
    describe("When is on empty status", () => {
      const event = {
        keyCode: 38
      };
      const comp = shallow(<Controller />).instance();
      comp.setEmptyState();

      it("does nothing", () => {
        expect(comp.onKeyDown(event)).toBeNull();
      });
    });

    describe("When is not ENTER", () => {
      it("calls handleFocus", () => {
        const handleFocusMock = jest.fn();
        const event = {
          keyCode: 38
        };
        const comp = shallow(<Controller />).instance();
        comp.handleFocus = handleFocusMock;
        comp.onKeyDown(event);
        expect(handleFocusMock).toHaveBeenCalled();
      });
    });
    
    describe("When is ENTER", () => {
      it("calls handleEnter", () => {
        const handleFocusMock = jest.fn();
        const handleEnterMock = jest.fn();
        const event = {
          keyCode: 13 // this is the code associated to ENTER ( controller.js@22)
        };
        const comp = shallow(<Controller />).instance();
        comp.handleFocus = handleFocusMock;
        comp.handleEnter = handleEnterMock;
        comp.onKeyDown(event);
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
      expect(comp.instance().canMoveToPreviousParent()).toBeFalsy();
    });

    it("can moves to the previous parent if the focus is not the first parent", () => {
      comp.instance().currentFocus = 1;
      expect(comp.instance().canMoveToPreviousParent()).toBeTruthy();
    });
  });

  describe("CanMoveToNextParent", () => {
    const comp = shallow(<Controller />);

    it("returns true if the focus is not in the last parent", () => {
      comp.setState({
        tree: [VerticalParent, VerticalParent]
      });
      expect(comp.instance().canMoveToNextParent()).toBeTruthy();
    });

    it("returns false if the focus is in the last parent", () => {
      comp.setState({
        tree: [VerticalParent, VerticalParent]
      });
      comp.instance().currentFocus = 1;
      expect(comp.instance().canMoveToNextParent()).toBeFalsy();
    });
  });

  describe("focusInParentOnInitEdge", () => {
    const comp = shallow(<Controller />).instance();

    it("returns true if the focus is in the first element", () => {
      const parent1 = shallow(<VerticalParent />).instance();
      const currentFocus = 0;
      parent1.setState({
        tree: [Child, Child]
      });
      parent1.currentFocus = currentFocus;

      comp.setState({ tree: [parent1] });
      expect(comp.focusInParentOnInitEdge()).toBeTruthy();
    });

    it("returns false if the focus is not in the first element", () => {
      const parent1 = shallow(<VerticalParent />).instance();
      parent1.setState({
        currentFocus: 1,
        tree: [Child, Child]
      });

      comp.setState({ tree: [parent1] });
      expect(comp.focusInParentOnInitEdge()).toBeFalsy();
    });
  });

  describe("focusInParentOnFinalEdge", () => {
    const comp = shallow(<Controller />).instance();

    it("returns true if the focus is in the last element", () => {
      const parent1 = shallow(<VerticalParent />).instance();
      const currentFocus = 1;
      parent1.setState({
        tree: [Child, Child]
      });
      parent1.currentFocus = currentFocus;

      comp.setState({ tree: [parent1] });
      expect(comp.focusInParentOnFinalEdge()).toBeTruthy();
    });

    it("returns false if the focus is not in the last element", () => {
      const parent1 = shallow(<VerticalParent />).instance();
      parent1.setState({
        currentFocus: 0,
        tree: [Child, Child]
      });

      comp.setState({ tree: [parent1] });
      expect(comp.focusInParentOnFinalEdge()).toBeFalsy();
    });
  });

  describe("HandleEnter", () => {
    describe("When onEnter is defined on the component that has the focus", () => {
      it("calls onEnter", () => {
        const onEnterMock = jest.fn();
        const comp = mount(
          <Controller>
            <VerticalParent>
              <Child onEnter={onEnterMock} />
              <Child />
            </VerticalParent>
          </Controller>
        );
        comp.instance().handleEnter();

        expect(onEnterMock).toHaveBeenCalled();
        comp.unmount();
      });
    });

    describe("When onEnter is not defined on the component that has the focus", () => {
      it("does not call onEnter", () => {
        const onEnterMock = jest.fn();
        const comp = mount(
          <Controller>
            <VerticalParent>
              <Child />
              <Child />
            </VerticalParent>
          </Controller>
        );
        comp.instance().handleEnter();
        expect(onEnterMock).not.toHaveBeenCalled();
        comp.unmount();
      });
    });
  });

  describe("HasFocus", () => {
    it("returns true if the parent has the focus", () => {
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<HorizontalParent />).instance();
      comp.setState({ tree: [parent] });
      expect(comp.hasFocus(parent)).toBeTruthy();
    });
  });

  describe("FindAnotherParent", () => {
    describe("when can move to next parent", () => {
      const comp = mount(
        <Controller>
          <VerticalParent />
          <VerticalParent />
        </Controller>
      );
      comp.instance().currentFocus = 0;
      comp.instance().moveFocusInTree = jest.fn();
      comp.instance().findAnotherParent();
      it("calls moveFocusInTree in order to move to the next parent", () => {
        expect(comp.instance().moveFocusInTree).toBeCalled();
        expect(comp.instance().moveFocusInTree.mock.calls[0][0]).toBe(POSITIVE);
        comp.unmount();
      });
    });

    describe("When can not move to the next parent but previous", () => {
      const comp = mount(
        <Controller>
          <VerticalParent />
          <VerticalParent />
        </Controller>
      );
      comp.instance().currentFocus = 1;
      comp.instance().moveFocusInTree = jest.fn();
      comp.instance().findAnotherParent();
      it("calls moveFocusInTree in order to move to the previous parent", () => {
        expect(comp.instance().moveFocusInTree).toBeCalled();
        expect(comp.instance().moveFocusInTree.mock.calls[0][0]).toBe(NEGATIVE);
        comp.unmount();
      });
    });

    describe("When can not move to neither the next parent not the previous", () => {
      const comp = mount(
        <Controller>
          <VerticalParent />
        </Controller>
      );
      comp.instance().currentFocus = 0;
      comp.instance().setEmptyState = jest.fn();
      comp.instance().findAnotherParent();

      it("calls moveFocusInTree in order to move to the previous parent", () => {
        expect(comp.instance().setEmptyState).toBeCalled();
      });
    });
  });

  describe("SetEmptyState", () => {
    const comp = shallow(<Controller />);
    it("Sets up the currentFocus as null", () => {
      expect(comp.instance().currentFocus).toBe(0);
      comp.instance().setEmptyState();
      expect(comp.instance().currentFocus).toBeNull();
    });
  });

  describe("HandleFocus", () => {
    describe("When direction is HORIZONTAL", () => {
      it("calls handleFocusInHorizontalParent", () => {
        const handleFocusInHorizontalParentMock = jest.fn();
        const comp = shallow(<Controller />).instance();
        const parent = shallow(<HorizontalParent />).instance();
        parent.setState({ type: HORIZONTAL });
        comp.handleFocusInHorizontalParent = handleFocusInHorizontalParentMock;
        comp.setState({ tree: [parent] });
        comp.handleFocus(HORIZONTAL);
        expect(handleFocusInHorizontalParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is VERTICAL", () => {
      it("calls handleFocusInVerticalParent", () => {
        const handleFocusInVerticalParentMock = jest.fn();
        const comp = shallow(<Controller />).instance();
        const parent = shallow(<VerticalParent />).instance();
        parent.setState({ type: VERTICAL });

        comp.handleFocusInVerticalParent = handleFocusInVerticalParentMock;
        comp.setState({ tree: [parent] });
        comp.handleFocus(VERTICAL);
        expect(handleFocusInVerticalParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is MATRIX", () => {
      it("calls handleFocusInMatrixParent", () => {
        const handleFocusInMatrixParentMock = jest.fn();
        const comp = shallow(<Controller />).instance();
        const parent = shallow(<MatrixParent />).instance();
        parent.setState({ type: MATRIX });
        comp.handleFocusInMatrixParent = handleFocusInMatrixParentMock;
        comp.setState({ tree: [parent] });
        comp.handleFocus(MATRIX);
        expect(handleFocusInMatrixParentMock).toHaveBeenCalled();
      });
    });
  });

  describe("SetFocusInParent", () => {
    describe("When onFocus is defined on the Parent", () => {
      const onFocusMock = jest.fn();
      const focusIndex = 0;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <VerticalParent onFocus={onFocusMock} />
      ).instance();
      const child = shallow(<Child />).instance();
      comp.setState({ tree: [parent] });
      parent.setState({
        tree: [child, child]
      });
      comp.setFocusInParent(parent, focusIndex);

      it("calls onFocus", () => {
        expect(onFocusMock).toHaveBeenCalled();
        expect(onFocusMock.mock.calls[0][0]).toBe(focusIndex);
      });
    });

    describe("When onFocus is not defined on the Parent", () => {
      const onFocusMock = jest.fn();
      const focusIndex = 0;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <VerticalParent onFocusFake={onFocusMock} />
      ).instance();
      const child = shallow(<Child />).instance();

      comp.setState({ tree: [parent] });
      parent.setState({
        tree: [child, child]
      });
      comp.setFocusInParent(parent, focusIndex);

      it("does not call onFocus", () => {
        expect(onFocusMock).not.toHaveBeenCalled();
      });
    });

    describe("When onFocus is defined on the child with the focus", () => {
      const onFocusMock = jest.fn();
      const currentFocus = 0;
      const focusIndex = 0;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      const child = shallow(<Child onFocus={onFocusMock} />).instance();
      comp.setState({ tree: [parent] });
      parent.setState({
        tree: [child, child]
      });
      comp.setFocusInParent(parent, focusIndex);

      it("calls onFocus", () => {
        expect(onFocusMock).toHaveBeenCalled();
      });

      it("sets the parent's currentFocus as focusIndex", () => {
        expect(parent.currentFocus).toBe(currentFocus);
      });
    });

    describe("When onFocus is not defined on the child with the focus", () => {
      const onFocusMock = jest.fn();
      const focusIndex = 0;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      const child = shallow(<Child />).instance();
      comp.setState({ tree: [parent] });
      parent.setState({
        tree: [child, child]
      });
      comp.setFocusInParent(parent, focusIndex);

      it("does not call onFocus", () => {
        expect(onFocusMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("AddParentToTree", () => {
    describe("adds the parent to the tree", () => {
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      comp.setState({ tree: [] });
      comp.state.tree.push = jest.fn();
      comp.addParentToTree(parent);

      it("executing push to the array", () => {
        expect(comp.state.tree.push).toHaveBeenCalled();
      });
    });

    describe("With Focus", () => {
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      const parentWithFocus = shallow(<VerticalParent withFocus />).instance();
      comp.setState({ tree: [parent] });
      comp.currentFocus = 1;
      parentWithFocus.setState({ currentFocus: 0 });
      comp.quitFocusInParent = jest.fn();
      comp.setParentFocus = jest.fn();
      comp.addParentToTree(parentWithFocus);

      it("quits the current Focus and sets the focus in the parent after mounting ", () => {
        expect(comp.quitFocusInParent).toHaveBeenCalled();
        expect(comp.setParentFocus).toBeCalled();
      });
    });
  });

  describe("DeleteParentFromTree", () => {
    describe("When the focus is on the item that has to be deleted", () => {
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      const parent2 = shallow(<VerticalParent />).instance();
      comp.setState({ tree: [parent, parent2] });
      comp.currentFocus = 0;
      comp.state.tree.splice = jest.spyOn(comp.state.tree, "splice");
      comp.setParentFocus = jest.fn();
      comp.deleteParentFromTree(parent);

      describe("deletes the parent from the tree", () => {
        it("executing splice to the array", () => {
          expect(comp.state.tree.splice).toHaveBeenCalled();
        });
      });

      describe("Sets the focus on the first parent", () => {
        it("calling setParentFocus", () => {
          expect(comp.setParentFocus).toHaveBeenCalled();
        });
      });
    });

    describe("When the focus is not on the item that has to be deleted", () => {
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      const parent2 = shallow(<VerticalParent />).instance();
      comp.setState({ tree: [parent, parent2] });
      const currentFocus = 1;
      comp.currentFocus = currentFocus;
      comp.state.tree.splice = jest.spyOn(comp.state.tree, "splice");
      comp.setFocusState = jest.fn();
      comp.deleteParentFromTree(parent);

      describe("deletes the parent from the tree", () => {
        it("executing splice to the array", () => {
          expect(comp.state.tree.splice).toHaveBeenCalled();
        });
      });

      describe("Sets the focus on the first parent", () => {
        it("calling setFocusState", () => {
          expect(comp.setFocusState).toHaveBeenCalled();
          expect(comp.setFocusState.mock.calls[0][0]).toBe(currentFocus - 1);
        });
      });
    });
  });

  describe("QuitFocusInParent", () => {
    describe("When onBlur is defined on the Parent", () => {
      const onBlurMock = jest.fn();
      const focusIndex = 0;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent onBlur={onBlurMock} />).instance();
      const child = shallow(<Child />).instance();
      comp.setState({ tree: [parent] });
      parent.setState({
        currentFocus: 0,
        tree: [child, child]
      });
      comp.quitFocusInParent(parent, focusIndex);

      it("calls onBlur", () => {
        expect(onBlurMock).toHaveBeenCalled();
        expect(onBlurMock.mock.calls[0][0]).toBe(focusIndex);
      });
    });

    describe("When onBlur is not defined on the Parent", () => {
      const onBlurMock = jest.fn();
      const focusIndex = 0;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      const child = shallow(<Child />).instance();
      comp.setState({ tree: [parent] });
      parent.setState({
        tree: [child, child]
      });
      comp.quitFocusInParent(parent, focusIndex);

      it("does not call onBlur", () => {
        expect(onBlurMock).not.toHaveBeenCalled();
      });
    });

    describe("When onBlur is defined on the child with the focus", () => {
      const onBlurMock = jest.fn();
      const focusIndex = 0;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      const child = shallow(<Child onBlur={onBlurMock} />).instance();
      comp.setState({ tree: [parent] });
      parent.setState({
        tree: [child, child]
      });
      comp.quitFocusInParent(parent, focusIndex);

      it("calls onFocus", () => {
        expect(onBlurMock).toHaveBeenCalled();
      });

      it("sets the parent's currentFocus as focusIndex", () => {
        expect(parent.currentFocus).toBe(0);
      });
    });

    describe("When onBlur is not defined on the child with the focus", () => {
      const onBlurMock = jest.fn();
      const focusIndex = 0;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      const child = shallow(<Child />).instance();
      comp.setState({ tree: [parent] });
      parent.setState({
        tree: [child, child]
      });
      comp.quitFocusInParent(parent, focusIndex);

      it("does not call onFocus", () => {
        expect(onBlurMock).not.toHaveBeenCalled();
      });
    });
  });

  describe("HandleFocusInVerticalParent", () => {
    describe("When direction is LEFT and currentFocus > 0", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const currentFocus = 1;
      const direction = LEFT;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      comp.setState({
        tree: [parent, parent]
      });
      comp.currentFocus = currentFocus;
      comp.quitFocusInParent = quitFocusInParentMock;
      comp.moveFocusInParent = moveFocusInParentMock;
      comp.handleFocusInVerticalParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("updates the state with the new focus", () => {
        expect(comp.currentFocus).toBe(currentFocus - 1);
      });

      it("moves the focus to the next child", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is RIGHT and currentFocus < parent's children lenght minus 1", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const currentFocus = 0;
      const direction = RIGHT;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<VerticalParent />).instance();
      comp.setState({
        tree: [parent, parent]
      });
      comp.currentFocus = currentFocus;
      comp.quitFocusInParent = quitFocusInParentMock;
      comp.moveFocusInParent = moveFocusInParentMock;
      comp.handleFocusInVerticalParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("updates the state with the new focus", () => {
        expect(comp.currentFocus).toBe(currentFocus + 1);
      });

      it("moves the focus to the next child", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is DOWN", () => {
      describe("and it's not in the last element of the tree and it's not the final parent", () => {
        const moveFocusInParentMock = jest.fn();
        const direction = DOWN;
        const comp = shallow(<Controller />).instance();
        const parent = shallow(<VerticalParent />).instance();
        const children = shallow(<Child />).instance();
        parent.state = {
          tree: [children, children]
        };
        comp.setState({
          tree: [parent, parent]
        });
        comp.moveFocusInParent = moveFocusInParentMock;
        comp.handleFocusInVerticalParent(direction);

        it("moves the focus to the next element inside the same parent", () => {
          expect(moveFocusInParentMock).toHaveBeenCalled();
          expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(moveFocusInParentMock.mock.calls[0][1]).toBe(POSITIVE);
        });
      });

      describe("and it's in the last element of the tree and it's the final parent", () => {
        const moveFocusInTreeMock = jest.fn();
        const direction = DOWN;
        const comp = shallow(<Controller />).instance();
        const parent1 = shallow(<VerticalParent />).instance();
        const parent2 = shallow(<HorizontalParent />).instance();
        const children = shallow(<Child />).instance();
        parent1.state = {
          tree: [children, children]
        };
        parent1.currentFocus = 1;
        parent2.state = {
          tree: [children, children]
        };
        parent2.currentFocus = 0;
        comp.setState({
          tree: [parent1, parent2]
        });
        comp.moveFocusInTree = moveFocusInTreeMock;
        comp.handleFocusInVerticalParent(direction);

        it("moves the focus to the next parent", () => {
          expect(moveFocusInTreeMock).toHaveBeenCalled();
          expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(POSITIVE);
        });
      });
    });

    describe("When direction is UP", () => {
      describe("and it's not the first element of the tree and it's the last parent", () => {
        const moveFocusInParentMock = jest.fn();
        const direction = UP;
        const comp = shallow(<Controller />).instance();
        const parent = shallow(<VerticalParent />).instance();
        parent.state = {
          currentFocus: 0
        };
        comp.setState({
          tree: [parent, parent]
        });
        comp.moveFocusInParent = moveFocusInParentMock;
        comp.handleFocusInVerticalParent(direction);

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
        const comp = shallow(<Controller />).instance();
        const parent1 = shallow(<HorizontalParent />).instance();
        const parent2 = shallow(<VerticalParent />).instance();
        const children = shallow(<Child />).instance();
        parent1.state = {
          tree: [children, children]
        };
        parent1.currentFocus = 1;
        parent2.state = {
          tree: [children, children]
        };
        parent2.currentFocus = 0;
        comp.setState({
          tree: [parent1, parent2]
        });
        comp.currentFocus = currentFocus;
        comp.moveFocusInTree = moveFocusInTreeMock;
        comp.handleFocusInVerticalParent(direction);

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
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<HorizontalParent />).instance();
      comp.setState({
        tree: [parent, parent]
      });
      comp.currentFocus = currentFocus;
      comp.quitFocusInParent = quitFocusInParentMock;
      comp.moveFocusInParent = moveFocusInParentMock;
      comp.handleFocusInHorizontalParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("updates the state with the new focus", () => {
        expect(comp.currentFocus).toBe(currentFocus - 1);
      });

      it("moves the focus to the next child", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is DOWN and currentFocus < parent's children lenght minus 1", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const currentFocus = 0;
      const direction = DOWN;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(<HorizontalParent />).instance();
      comp.setState({
        tree: [parent, parent]
      });
      comp.quitFocusInParent = quitFocusInParentMock;
      comp.moveFocusInParent = moveFocusInParentMock;
      comp.handleFocusInHorizontalParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("updates the state with the new focus", () => {
        expect(comp.currentFocus).toBe(currentFocus + 1);
      });

      it("moves the focus to the next child", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is RIGHT", () => {
      describe("and there are not more parents or it's not in the last element", () => {
        const moveFocusInParentMock = jest.fn();
        const direction = RIGHT;
        const comp = shallow(<Controller />).instance();
        const parent = shallow(<HorizontalParent />).instance();
        const children = shallow(<Child />).instance();
        parent.state = {
          tree: [children, children]
        };
        parent.currentFocus = 0;
        comp.setState({
          tree: [parent, parent]
        });
        comp.moveFocusInParent = moveFocusInParentMock;
        comp.handleFocusInHorizontalParent(direction);

        it("moves the focus to the next child", () => {
          expect(moveFocusInParentMock).toHaveBeenCalled();
          expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(moveFocusInParentMock.mock.calls[0][1]).toBe(POSITIVE);
        });
      });

      describe("and there are more parents or it's in the last element", () => {
        const moveFocusInTreeMock = jest.fn();
        const direction = RIGHT;
        const comp = shallow(<Controller />).instance();
        const parent1 = shallow(<HorizontalParent />).instance();
        const parent2 = shallow(<VerticalParent />).instance();
        const children = shallow(<Child />).instance();
        parent1.state = {
          tree: [children, children]
        };
        parent1.currentFocus = 1;
        parent2.state = {
          tree: [children, children]
        };
        parent2.currentFocus = 0;
        comp.setState({
          tree: [parent1, parent2]
        });
        comp.currentFocus = 0;
        comp.moveFocusInTree = moveFocusInTreeMock;
        comp.handleFocusInHorizontalParent(direction);

        it("moves the focus to the next parent", () => {
          expect(moveFocusInTreeMock).toHaveBeenCalled();
          expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(POSITIVE);
        });
      });
    });

    describe("When direction is LEFT", () => {
      describe("and it's in the first parent or it's not in the first element", () => {
        const moveFocusInParentMock = jest.fn();
        const direction = LEFT;
        const comp = shallow(<Controller />).instance();
        const parent = shallow(<HorizontalParent />).instance();
        parent.state = {
          currentFocus: 0
        };
        comp.setState({
          tree: [parent, parent]
        });
        comp.moveFocusInParent = moveFocusInParentMock;
        comp.handleFocusInHorizontalParent(direction);

        it("moves the focus to the next child", () => {
          expect(moveFocusInParentMock).toHaveBeenCalled();
          expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
          expect(moveFocusInParentMock.mock.calls[0][1]).toBe(NEGATIVE);
        });
      });

      describe("and it's not in the first parent and it's in the first element", () => {
        const moveFocusInTreeMock = jest.fn();
        const currentFocus = 1;
        const direction = LEFT;
        const comp = shallow(<Controller />).instance();
        const parent1 = shallow(<VerticalParent />).instance();
        const parent2 = shallow(<HorizontalParent />).instance();
        const children = shallow(<Child />).instance();

        parent1.state = {
          tree: [children, children]
        };
        parent1.currentFocus = 0;
        parent2.state = {
          tree: [children, children]
        };
        parent2.currentFocus = 0;
        comp.setState({
          tree: [parent1, parent2]
        });
        comp.currentFocus = currentFocus;
        comp.moveFocusInTree = moveFocusInTreeMock;
        comp.handleFocusInHorizontalParent(direction);

        it("moves the focus to the next parent", () => {
          expect(moveFocusInTreeMock).toHaveBeenCalled();
          expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(NEGATIVE);
        });
      });

      describe("and it's not in the first parent and it's in the first element with force focus", () => {
        const moveFocusInTreeMock = jest.fn();
        const currentFocus = 1;
        const direction = LEFT;
        const comp = shallow(<Controller />).instance();
        const parent1 = shallow(<VerticalParent />).instance();
        const parent2 = shallow(<HorizontalParent />).instance();
        const children = shallow(<Child />).instance();

        parent1.state = {
          tree: [children, children]
        };
        parent1.currentFocus = 0;
        parent2.state = {
          tree: [children, children]
        };
        parent2.currentFocus = 0;
        parent2.forceFocus = 0;
        comp.setState({
          tree: [parent1, parent2]
        });
        comp.currentFocus = currentFocus;
        comp.moveFocusInTree = moveFocusInTreeMock;
        comp.handleFocusInHorizontalParent(direction);

        it("moves the focus to the next parent", () => {
          expect(moveFocusInTreeMock).toHaveBeenCalled();
          expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(0);
        });
      });
    });
  });

  describe("HandleFocusInMatrixParent", () => {
    describe("When direction is RIGHT and the currentFocus is not on the right edge", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const direction = RIGHT;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={40} rows={10} />
      ).instance();

      parent.state = {
        columns: 40,
        rows: 10
      };
      parent.currentFocus = 0;
      comp.setState({
        tree: [parent, parent]
      });
      comp.quitFocusInParent = quitFocusInParentMock;
      comp.moveFocusInParent = moveFocusInParentMock;
      comp.handleFocusInMatrixParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("moves the focus to the next child", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is RIGHT and the currentFocus is on the right edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const direction = RIGHT;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={10} rows={10} />
      ).instance();
      parent.state = {
        columns: 10,
        rows: 10
      };
      parent.currentFocus = 9;
      comp.setState({
        tree: [parent, parent]
      });
      comp.moveFocusInTree = moveFocusInTreeMock;
      comp.handleFocusInMatrixParent(direction);

      it("moves the focus to the next parent if there is a next parent", () => {
        expect(moveFocusInTreeMock).toHaveBeenCalled();
        expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(POSITIVE);
      });
    });

    describe("When direction is RIGHT and the currentFocus is on the right edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 1;
      const direction = RIGHT;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={10} rows={10} />
      ).instance();
      parent.state = {
        columns: 10,
        rows: 10
      };
      parent.currentFocus = 9;
      comp.setState({
        tree: [parent, parent]
      });
      comp.currentFocus = currentFocus;
      comp.moveFocusInTree = moveFocusInTreeMock;
      comp.handleFocusInMatrixParent(direction);

      it("does not move if there is not next parent", () => {
        expect(moveFocusInTreeMock).not.toHaveBeenCalled();
      });
    });

    describe("When direction is LEFT and currentFocus is not on the left edge", () => {
      const quitFocusInParentMock = jest.fn();
      const moveFocusInParentMock = jest.fn();
      const direction = LEFT;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={40} rows={10} />
      ).instance();
      parent.currentFocus = 1;
      parent.state = {
        columns: 40,
        rows: 10
      };
      comp.setState({
        tree: [parent, parent]
      });
      comp.quitFocusInParent = quitFocusInParentMock;
      comp.moveFocusInParent = moveFocusInParentMock;
      comp.handleFocusInMatrixParent(direction);

      it("quits the focus of the current element", () => {
        expect(quitFocusInParentMock).toHaveBeenCalled();
      });

      it("moves the focus to the next child", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
      });
    });

    describe("When direction is LEFT and the currentFocus is on the left edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 1;
      const direction = LEFT;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={10} rows={10} />
      ).instance();
      parent.state = {
        columns: 10,
        rows: 10
      };
      parent.currentFocus = 0;
      comp.setState({
        tree: [parent, parent]
      });
      comp.currentFocus = currentFocus;
      comp.moveFocusInTree = moveFocusInTreeMock;
      comp.handleFocusInMatrixParent(direction);

      it("moves the focus to the previous parent", () => {
        expect(moveFocusInTreeMock).toHaveBeenCalled();
        expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(NEGATIVE);
      });
    });

    describe("When direction is LEFT and the currentFocus is on the left edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const direction = LEFT;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={10} rows={10} />
      ).instance();
      parent.state = {
        columns: 10,
        rows: 10
      };
      parent.currentFocus = 0;
      comp.setState({
        tree: [parent, parent]
      });
      comp.moveFocusInTree = moveFocusInTreeMock;
      comp.handleFocusInMatrixParent(direction);

      it("does not move the focus to the previous parent if there is not previous parent", () => {
        expect(moveFocusInTreeMock).not.toHaveBeenCalled();
      });
    });

    describe("When direction is DOWN", () => {
      const moveFocusInParentMock = jest.fn();
      const quitFocusInParentMock = jest.fn();
      const direction = DOWN;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={40} rows={10} />
      ).instance();
      parent.state = {
        columns: 40,
        rows: 40
      };
      parent.currentFocus = 0;
      comp.setState({
        tree: [parent, parent]
      });
      comp.moveFocusInParent = moveFocusInParentMock;
      comp.quitFocusInParent = quitFocusInParentMock;
      comp.handleFocusInMatrixParent(direction);

      it("deletes the focus to the current focus", () => {
        expect(quitFocusInParentMock).toBeCalled();
      });

      it("moves the focus to the current focus", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
        expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
        expect(moveFocusInParentMock.mock.calls[0][1]).toBe(POSITIVE);
      });
    });

    describe("When direction is DOWN and the currentFocus is on the final edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const direction = DOWN;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={10} rows={10} />
      ).instance();
      parent.state = {
        columns: 10,
        rows: 10
      };
      parent.currentFocus = 90;
      comp.setState({
        tree: [parent, parent]
      });
      comp.moveFocusInTree = moveFocusInTreeMock;
      comp.handleFocusInMatrixParent(direction);

      it("moves the focus to the next parent", () => {
        expect(moveFocusInTreeMock).toHaveBeenCalled();
        expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(POSITIVE);
      });
    });

    describe("When direction is DOWN and the currentFocus is on the final edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 1;
      const direction = DOWN;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={10} rows={10} />
      ).instance();
      parent.state = {
        columns: 10,
        rows: 10
      };
      parent.currentFocus = 90;
      comp.setState({
        tree: [parent, parent]
      });
      comp.currentFocus = currentFocus;
      comp.moveFocusInTree = moveFocusInTreeMock;
      comp.handleFocusInMatrixParent(direction);

      it("does not move the focus to the next parent if there is not next parent", () => {
        expect(moveFocusInTreeMock).not.toHaveBeenCalled();
      });
    });

    describe("When direction is UP", () => {
      const moveFocusInParentMock = jest.fn();
      const quitFocusInParentMock = jest.fn();
      const direction = UP;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={40} rows={10} />
      ).instance();
      parent.state = {
        columns: 40,
        rows: 40
      };
      (parent.currentFocus = 41),
        comp.setState({
          tree: [parent, parent]
        });
      comp.moveFocusInParent = moveFocusInParentMock;
      comp.quitFocusInParent = quitFocusInParentMock;
      comp.handleFocusInMatrixParent(direction);

      it("deletes the focus from the current focus", () => {
        expect(quitFocusInParentMock).toBeCalled();
      });

      it("moves the focus to the next child", () => {
        expect(moveFocusInParentMock).toHaveBeenCalled();
        expect(moveFocusInParentMock.mock.calls[0][0]).toBe(parent);
        expect(moveFocusInParentMock.mock.calls[0][1]).toBe(NEGATIVE);
      });
    });

    describe("When direction is UP and the currentFocus is on the init edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const currentFocus = 1;
      const direction = UP;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={10} rows={10} />
      ).instance();
      parent.state = {
        columns: 10,
        rows: 10
      };
      parent.currentFocus = 0;
      comp.setState({
        tree: [parent, parent]
      });
      comp.currentFocus = currentFocus;
      comp.moveFocusInTree = moveFocusInTreeMock;
      comp.handleFocusInMatrixParent(direction);

      it("moves the focus to the previous parent", () => {
        expect(moveFocusInTreeMock).toHaveBeenCalled();
        expect(moveFocusInTreeMock.mock.calls[0][0]).toBe(NEGATIVE);
      });
    });

    describe("When direction is UP and the currentFocus is on the init edge", () => {
      const moveFocusInTreeMock = jest.fn();
      const direction = UP;
      const comp = shallow(<Controller />).instance();
      const parent = shallow(
        <MatrixParent columns={10} rows={10} />
      ).instance();
      parent.state = {
        columns: 10,
        rows: 10
      };
      comp.setState({
        tree: [parent, parent]
      });
      comp.moveFocusInTree = moveFocusInTreeMock;
      comp.handleFocusInMatrixParent(direction);

      it("does not move the focus to the previous parent if there is not previous parent", () => {
        expect(moveFocusInTreeMock).not.toHaveBeenCalled();
      });
    });
  });
});
