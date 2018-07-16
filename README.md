# React Spatial Navigation

This project aims to build a navigation tooll based on React. 

# How to use

There are 3 main components: 

- Controller
- Parent
- Child

The main idea is the following: 

There is one single controller in charge of managing the focus, it means that there is a global state that represents where the focus is. 

This controller has N different parents and each parent has M children. The structure could be like the following:


                         /-----   Controller   -----
                      /               |               \
                   /                  |                 \
                /                     |                   \
            Parent1                 Parent2              Parent3
          /   |   \                   |                   /    \
         /    |    \                  |                  /       \
    Child1  Child2 Child3           Child1             Child1    Child2

By default, the focus starts on the first child of the first parent. If this component has implemented the method "onFocus", it will be executed.

Let's say that we want to move the focus to the next child, we need to press the arrow keys in order to move the focus ( we will review this point later ) and the focus is moved from the Child 1 to Child 2.

If Child 1 has implemented the method "onBlur" it will be executed by the controller before moving the focus to the next Child ( Child 2 ) and if this component has implemented the function "onFocus" it will be executed.

Once the focus is on one component, by pressing "ENTER", if the component has implemented the method "onEnter" it will be executed.

# Example

```js
import React from "react";
import ReactDOM from "react-dom";
import Controller from "./../src/controller";
import { VerticalParent } from "./../src/parent";
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
        <h1> Vertical Columns - it moves the focus either up or down </h1>
        <p>
          If we move out of the scope of each list, it moves to the next or
          previous parent ( if present, if not, nothing happens )
        </p>
        <p>
          Also, by clicking left or right, it moves to the next or previous
          parent ( if present, if not, nothing happens )
        </p>
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
    </Controller>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
```

# Parents

There are 3 kind of different parents:

- Vertical Parent
- Horizontal Parent
- Matrix Parent

As you can imagine, it represents the different ways we can navigate through the parents using the arrow keys.

## Vertical Parent

By default, if we want to move from one child to another, we should use "UP" and "DOWN". By pressing "UP" we will move the focus to the next child ( if present ) and by pressing "DOWN" we will move the focus to the previous child ( if present ).

We can combine multiple parents in order to create something like the following:

    Parent 1            Parent 2
    |                   |
    |-- Child 1         |-- Child 1
    |                   |
    |-- Child 2         |-- Child 2

Let's say the focus is on the child 2 of the parent 1. There are 4 possible scenarios:

- By pressing 'UP' we will move the focus to the Child 1
- By pressing 'DOWN' there won't be any efect as there are not more children
- By pressing 'LEFT' there won't be any efect as there are not previous parents
- By pressing 'RIGHT' we will move the focus to the first child of the next parent

## Horizontal Parent

By default, if we want to move from one child to another, we should use "LEFT" and "RIGHT". By pressing "RIGHT" we will move the focus to the next child ( if present ) and by pressing "LEFT" we will move the focus to the previous child ( if present ).

We can combine multiple parents in order to create something like the following:

    Parent 1 -- Child 1 -- Child 2
    Parent 2 -- Child 1 -- Child 2
    

Let's say the focus is on the child 2 of the parent 1. There are 4 possible scenarios:

- By pressing 'LEFT' we will move the focus to the Child 1
- By pressing 'RIGHT' there won't be any efect as there are not more children
- By pressing 'DOWN' we will move the focus to Child 1 of the next parent ( Parent 2)
- By pressing 'UP' there won't be any efect as there are not previous parents

## Matrix Parent

By default, if we want to move from one child to another, we can use any arrow key in order to simulate all directions.  

Given the following example:

              Parent 1
                || ( It represents that all children belong to Parent 1)
                ||
    Child 1 -- Child 2 -- Child 3
      |          |           |
    Child 4 -- Child 5 -- Child 6
      |          |           |
    Child 7 -- Child 8 -- Child 9
    

Let's say the focus is on the child 5. There are 4 possible scenarios:

- By pressing 'LEFT' we will move the focus to the Child 4
- By pressing 'RIGHT' we will move the focus to the Child 6
- By pressing 'DOWN' we will move the focus to the Child 8
- By pressing 'UP' we will move the focus to the Child 2

## Joining multiple different Parents

By can combine different in order to try to represent the best navigation experience. Let's say we have the following structure:


    VerticalParent 1  --------  MatrixParent 2    
    |                               ||
    |-Child 1                       ||
    |                Child 1 -- Child 2 -- Child 3
    |-Child 2             |           |
    |                Child 4 -- Child 5 -- Child 6
    |-Child 3             |           |
                     Child 7 -- Child 8 -- Child 9

Let's say that by default, the Controller moves the focus to the Child 1 on the first Parent ( Parent 1).

There are 4 different scenarios:

- By pressing 'DOWN', it moves the focus to the Child 2 of the Parent 1
- By pressing 'RIGHT", It moves the focus to the Child 1 of the Parent 2
- By pressing 'LEFT, there won't be any effect as there are not previous parents
- By pressing 'UP', there won't be any effect as there are not previous children.

Imagine we press 'RIGHT". It will move the focus to the Child 1 of the Parent 2.
As we have moved from a VerticalParent to a MatrixParent, now we have changed the way we can navigate.

Then, there are 4 different scenarios:

- By pressing 'DOWN', it moves the focus from Child 1 to Child 4
- By pressing 'UP', it moves the focus to the previous parent ( Vertical Parent)
- By pressing 'RIGHT", it moves the focus from Child 1 to Child 2 ( Same Parent )
- By pressing 'LEFT', it moves the focus to the previous parent as well ( Vertical Parent )

# Example

There is an example in order to understand how to combine multiple Parents. Please, check the folder EXAMPLE in order to use how to reproduce different scenarios


