const webpack = require("webpack");
const path = require('path');

module.exports = {
  entry: {
    map: __dirname + "/orderMonitor.js"
  },
  output: {
    path: __dirname + "/../dist/js",
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
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }]
  },
  watch: false,
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    contentBase: __dirname + "/../dist/",
    publicPath: "/js/",
    inline: true,
    hot: true
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      "@": __dirname + "/../../..",
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
