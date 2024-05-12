import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

export default {
  input: {
    core: "./src/core/index.ts",
    dom: "./src/dom/index.ts",
  },
  output: {
    dir: "./",
    format: "esm",
    entryFileNames: "[name]/index.js",
  },
  plugins: [resolve(), babel({ babelHelpers: "bundled" }), typescript()],
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    warn(warning);
  },
};
