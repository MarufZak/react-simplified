import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import livereload from "rollup-plugin-livereload";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "./src/index.tsx",
  output: {
    file: "./public/script.js",
    format: "esm",
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: "bundled" }),
    typescript(),
    postcss({
      plugins: [tailwindcss(), autoprefixer()],
      extract: false,
    }),
    serve({
      open: true,
      contentBase: "./public",
      port: 3000,
    }),
    livereload({
      watch: "./public",
    }),
  ],
};
