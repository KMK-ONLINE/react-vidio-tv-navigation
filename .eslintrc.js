module.exports = {
  parser: "babel-eslint",

  extends: ["eslint:recommended", "plugin:react/recommended"],
  settings: {
    react: {
      createClass: "createReactClass", // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: "React", // Pragma to use, default to "React"
      version: "16.4", // React version, default to the latest React stable release
      flowVersion: "0.75" // Flow version
    },
    propWrapperFunctions: ["forbidExtraProps"] // The names of any functions used to wrap the
    // propTypes object, e.g. `forbidExtraProps`.
    // If this isn't set, any propTypes wrapped in
    // a function will be skipped.
  },
  rules: {
    "no-undef": "off"
  }
};
