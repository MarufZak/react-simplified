import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import livereload from "rollup-plugin-livereload";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "./src/index.tsx",
  output: {
    file: "./public/script.js",
  },
  plugins: [
    nodeResolve(),
    babel({ babelHelpers: "bundled" }),
    typescript(),
    postcss({
      plugins: [tailwindcss(), autoprefixer()],
      extract: false,
    }),
    serve({
      contentBase: "./public",
      port: 3000,
    }),
    livereload({
      watch: "./public",
    }),
    terser(),
  ],
};
