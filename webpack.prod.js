const merge = require("webpack-merge");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Common webpack config
const commonWebpackConfig = require("./webpack.common.js");


console.log("Running webpack.prod.js file.");

module.exports = merge(commonWebpackConfig, {
  mode: "production",

  // https://webpack.js.org/configuration/devtool/
  devtool: "hidden-source-map",

  output: {
    filename: "[name].[chunkhash].js"
  },

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
    },
    minimizer: [
      new TerserWebpackPlugin({
        cache: false,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[hash].css", chunkFilename: "[id].[hash].css" }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  }
});
