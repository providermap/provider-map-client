const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [ "@babel/polyfill", "./src/index.jsx" ],

  output: {
    filename: "bundle.js",
    path: __dirname + "/public",
    publicPath: "/"
  },

  plugins: [
    // Remove your build folder before building
    new CleanWebpackPlugin(),
    // Add index.html template and favicon
    new HtmlWebpackPlugin({ template: "./index.html", favicon: "./src/app/assets/img/favicon.png" }),
  ],

  resolve: {
    extensions: [ ".jsx", ".js", ".json" ],
    modules: [ path.resolve(__dirname, "src/app"), "node_modules" ]
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitError: true,
          emitWarning: false,
        }
      },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(css|sass|scss)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      { test: /\.(png|svg|jpe?g|gif|woff|woff2|eot|ttf|otf)$/, loader: "file-loader" },
      { test: /\.html$/, loader: "html-loader" },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [ path.join(process.cwd(), "node_modules") ],
      },
    ]
  }
};