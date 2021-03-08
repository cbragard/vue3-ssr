const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
    mode: process.env.NODE_ENV === 'development'
        ? process.env.NODE_ENV
        : 'production',
    target: 'node',
    entry: {
        server: './src/server/server.js'
    },
    devtool: 'none',
    resolve: {
        alias: {
            vue: '@vue/runtime-dom'
        }
    },
    externals: [
        nodeExternals()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    }
}
module.exports = config
