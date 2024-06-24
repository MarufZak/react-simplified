import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";
import replace from "@rollup/plugin-replace";

const isProduction = process.env.NODE_ENV === "production";

export default {
  input: {
    core: "./src/core/index.ts",
    dom: "./src/dom/index.ts",
  },
  output: {
    dir: "./dist",
    format: "esm",
    entryFileNames: "[name]/index.js",
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: "bundled" }),
    typescript(),
    del({
      targets: "dist",
    }),
    isProduction && terser(),
    replace({
      __DEV__: isProduction,
      preventAssignment: true,
    }),
  ],
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED" && isProduction) return;
    if (warning.code === "EVAL" && isProduction) return;
    warn(warning);
  },
};
