const
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    { VueLoaderPlugin } = require('vue-loader'),
    ManifestPlugin = require('webpack-manifest-plugin'),
    webpack = require('webpack')

const config = {
    mode: process.env.NODE_ENV === 'development'
        ? process.env.NODE_ENV
        : 'production',
    target: 'web',
    entry:  {
        client: [
            '@babel/polyfill',
            './src/main.js'
        ]
    },
    devtool: 'none',
    resolve: {
        alias: {
            vue: '@vue/runtime-dom'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_HOST': JSON.stringify(process.env.NODE_HOST),
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin(),
        new ManifestPlugin({
            writeToFileEmit: true
        })
    ],
    output: {
        filename: process.env.NODE_ENV === 'development'
            ? '[name].js'
            : '[name].[hash].js',
        chunkFilename: process.env.NODE_ENV === 'development'
            ? '[name].js'
            : '[name].[hash].js',
        path: path.resolve(__dirname, 'build')
    },
    optimization: {
        splitChunks: {
            chunks: 'async'
        }
    }
}
if (process.env.NODE_ENV === 'development') {
    config.devtool = 'inline-source-map'
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.devServer = {
        host: '0.0.0.0',
        port: 3001,
        contentBase: './build',
        hot: true,
        watchOptions: {
            poll: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}
module.exports = config
