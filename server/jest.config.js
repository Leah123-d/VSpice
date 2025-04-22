export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",  // Transforms .js files with Babel
  },
  moduleFileExtensions: ["js", "json", "node"],  // Handle the extensions Jest can work with
};