export const controllerContext: ControllerState = {
  addParentToTree: jest.fn(),
  deleteParentFromTree: jest.fn(),
  hasFocus: jest.fn(),
  findAnotherParent: jest.fn()
};

export const ControllerContext = {
  Consumer(props) {
    return props.children(controllerContext);
  },
  Provider(props) {
    return props;
  }
};
