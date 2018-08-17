'use strict';
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/assets/js/scripts.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [ 
          {
            loader:  "style-loader"
          }, 
          {
            loader: "css-loader"
          }, 
          {
            loader: "sass-loader", options: {includePaths: ["./src/assets/scss/"]}
          }
        ]
      }
    ]
  },
  devServer: {
    port: '4200'
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ]),
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ],
  mode: 'development'
};