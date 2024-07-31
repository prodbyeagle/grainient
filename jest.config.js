module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  testMatch: ["**/test/**/*.test.ts"],
};
