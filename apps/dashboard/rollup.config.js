import { nodeResolve } from "@rollup/plugin-node-resolve";
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
  },
  plugins: [
    nodeResolve(),
    babel({ babelHelpers: "bundled" }),
    typescript(),
    postcss({
      plugins: [
        tailwindcss({ config: "../../packages/strapi-ui/tailwind.config.js" }),
        autoprefixer(),
      ],
      extract: false,
    }),
    serve({
      contentBase: "./public",
      port: 3000,
    }),
    livereload({
      watch: "./public",
    }),
  ],
  onwarn(warning, warn) {
    if (warning.code === "THIS_IS_UNDEFINED") return;
    if (warning.code === "EVAL") return;
    warn(warning);
  },
};
