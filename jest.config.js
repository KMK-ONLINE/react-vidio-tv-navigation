module.exports = {
  rootDir: "./",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["./src/*.js"],
  coverageDirectory: "<rootDir>/coverage",
  moduleFileExtensions: ["js"],
  testPathIgnorePatterns: ["<rootDir>/__tests__/setup.js"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 85,
      lines: 85,
      statements: 85
    }
  },
  setupTestFrameworkScriptFile: "<rootDir>/__tests__/setup.js"
};
