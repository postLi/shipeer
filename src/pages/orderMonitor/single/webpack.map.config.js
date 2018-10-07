const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        map: __dirname + "/app/map.js"
    },
    output: {
        path: __dirname + "/dist/webapp/js",
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
        }]
    },
    watch: false,
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        contentBase: path.resolve(__dirname, './static'),
        publicPath: "/js/",
        inline: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './static'),
                to: path.resolve(__dirname, './dist/webapp'),
            }
        ])
    ]
};