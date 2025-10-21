import path from "node:path";
import { globSync } from "glob";
import { fileURLToPath } from "node:url";
import packageJson from "./package.json" with { type: "json" };

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('webpack').Configuration} */
const config = {
  mode: isProduction ? "production" : "development",
  entry: Object.fromEntries(
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
    filename: "[name]/index.js",
    path: path.resolve("dist"),
    clean: true,
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              targets: "defaults",
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
  // IMPORTANT, because when using strapi-ui,
  // @marufzak/react/dom is expected to be loaded at runtime
  externals: Object.keys(packageJson.peerDependencies),
};

export default config;
