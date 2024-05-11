import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  input: "./src/index.js",
  output: {
    file: "./public/script.js",
    format: "esm",
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: "bundled" }),
    postcss({
      plugins: [tailwindcss(), autoprefixer()],
      extract: false,
    }),
  ],
};
