const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"), // entry file for the app
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                namedExport: false,
                localIdentName: "[name]__[local]__[hash:base64:5]", // for CSS Modules
              },
            },
          },
          "less-loader", // Compiles Less to CSS
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".less"],
    alias: {
      components: path.resolve(__dirname, "./src/components"),
    },
  },
  ...(isDev && {
    devServer: {
      port: 3000,
      static: path.resolve(__dirname, "../assets"),
      hot: true,
    },
  }),
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),
  ],
  devtool: isDev && "source-map",
};
