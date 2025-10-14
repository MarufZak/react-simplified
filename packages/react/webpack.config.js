import path from "node:path";
import CopyPlugin from "copy-webpack-plugin";

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
    path: path.resolve("dist"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "./src/types/index.d.ts", to: "./types" }],
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
};

export default config;
