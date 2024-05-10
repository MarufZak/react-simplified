import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

// rollup has no good integration with typescript, and @rollup/plugin-typescript works confusing when bundling tsx modules, and has 3-4 deps. For now i first compile to js with typescript compiler, then use rollup to bundle js files.

export default {
  input: "./public/ts/src/script.js",
  output: {
    file: "./public/script.js",
    format: "umd",
  },
  plugins: [resolve(), babel({ babelHelpers: "bundled" })],
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    warn(warning);
  },
};
