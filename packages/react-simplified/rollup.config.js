import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

const baseConfig = {
  plugins: [resolve(), babel({ babelHelpers: "bundled" }), typescript()],
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    warn(warning);
  },
};

export default [
  {
    input: "./src/core/index.ts",
    output: {
      file: "./build/core/index.js",
      format: "esm",
      name: "core",
    },
    ...baseConfig,
  },
  {
    input: "./src/dom/index.ts",
    output: {
      file: "./build/dom/index.js",
      format: "esm",
      name: "dom",
    },
    ...baseConfig,
  },
];
