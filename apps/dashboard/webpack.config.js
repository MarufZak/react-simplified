import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { readFileSync } from "node:fs";

const isProduction = process.env.NODE_ENV === "production";
const templateContent = readFileSync("./index.html").toString();

/** @type {import('webpack').Configuration} */
const config = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.tsx",
  devServer: {
    static: false,
  },
  output: {
    filename: "script.js",
    path: path.resolve(import.meta.dirname, "public"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(?:ts|tsx)$/,
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
    extensions: [".js", ".ts", ".tsx"],
  },
};

export default config;
