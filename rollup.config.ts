const resolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
/** @type {import('rollup').RollupOptions[]} */
module.exports = {
  input: {},
  output: {
    file: "./lib/script.js",
    format: "umd",
  },
  plugins: [resolve(), babel({ babelHelpers: "bundled" })],
};
