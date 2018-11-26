const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const API_URL = JSON.stringify('http://100.26.78.111/api')

const { resolve } = require('path');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/admin',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({ API_URL }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: resolve("public", "index.html"),
        })
    ],
    devServer: {
        contentBase: resolve("public"),
        historyApiFallback: true,
        hot: true,
        inline: true,
        publicPath: "/admin",
        port: 5000,
        disableHostCheck: true
    }
};