const resolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");

module.exports = {
  input: "./src/script.js",
  output: {
    file: "./lib/script.js",
    format: "umd",
  },
  plugins: [resolve(), babel({ babelHelpers: "bundled" })],
};
