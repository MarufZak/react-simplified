import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";

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
    terser(),
    del({
      targets: "dist",
    }),
  ],
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    warn(warning);
  },
};
