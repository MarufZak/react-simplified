import path from "node:path";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack";

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('webpack').Configuration} */
const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    core: "./src/core/index.ts",
    dom: "./src/dom/index.ts",
  },
  output: {
    filename: "[name]/index.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/types/index.d.ts", to: "./types" }],
    }),
    new webpack.DefinePlugin({
      __DEV__: !isProduction,
    }),
  ],
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
              presets: ["@babel/preset-env"],
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
};

export default config;
