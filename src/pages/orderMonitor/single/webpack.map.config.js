const webpack = require("webpack");
const path = require('path');

module.exports = {
  entry: {
    map: __dirname + "./orderMonitor.js"
  },
  output: {
    path: __dirname + "../dist/js",
    filename: "[name].js",
    publicPath: ""
  },
  module: {
    rules: [{
      test: /(\.jsx|\.js)$/,
      use: {
        loader: "babel-loader"
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }
      ]
    }, {
      test: /\.(jpg|png|gif|svg)$/,
      loader: 'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  watch: false,
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: "/js/",
    inline: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
