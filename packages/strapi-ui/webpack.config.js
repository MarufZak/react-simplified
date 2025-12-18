import path from "node:path";
import { globSync } from "glob";
import { fileURLToPath } from "node:url";
import packageJson from "./package.json" with { type: "json" };
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('webpack').Configuration} */
const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    "styles.css": "./src/globals.css",
    ...Object.fromEntries(
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
        {
          import: fileURLToPath(new URL(file, import.meta.url)),
          dependOn: file.includes("utils") ? undefined : "utils",
        },
      ]),
    ),
  },
  output: {
    filename: "[name].js",
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
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};

export default config;
