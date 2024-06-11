import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import typescript from "@rollup/plugin-typescript";
import { globSync } from "glob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";

export default {
  input: Object.fromEntries(
    globSync([
      "./src/{components,icons,icons/logos}/*.tsx",
      "./src/utils.ts",
    ]).map((file) => [
      // This remove `src/` as well as the file extension from
      // each file, so e.g. src/nested/foo.js becomes nested/foo
      path.relative(
        "src",
        file.slice(0, file.length - path.extname(file).length),
      ),
      // This expands the relative paths to absolute paths, so
      // e.g. src/nested/foo becomes /project/src/nested/foo.js
      fileURLToPath(new URL(file, import.meta.url)),
    ]),
  ),
  output: {
    format: "esm",
    dir: "./dist",
    name: "[name].js",
  },
  plugins: [
    nodeResolve(),
    babel({ babelHelpers: "bundled" }),
    typescript(),
    postcss({
      plugins: [tailwindcss(), autoprefixer()],
      extract: false,
    }),
    del({
      targets: "dist",
    }),
    process.env.NODE_ENV === "production" && terser(),
  ],
  // IMPORTANT, because when using strapi-ui, react-simplified/dom
  // is expected to be loaded at runtime
  external: ["react-simplified"],
};
