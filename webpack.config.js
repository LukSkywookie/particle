const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    port: '4211'
  },
  plugins: [
    // Ignore node_modules so CPU usage with poll
    // watching drops significantly.
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ]),
  ],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  entry: './src/index.js'
};