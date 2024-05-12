import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import serve from "rollup-plugin-serve";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import livereload from 'rollup-plugin-livereload'

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
    serve({
      open: true,
      contentBase: "./public",
      port: 3000
    }),
    livereload({
      watch: "./public"
    })
  ],
};
