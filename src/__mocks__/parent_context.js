const context = {
  addChildToTree: jest.fn(),
  deleteChildFromTree: jest.fn()
};

export const ParentContext = {
  Consumer(props) {
    return props.children(context);
  },
  Provider(props) {
    return props.children(context);
  }
};
