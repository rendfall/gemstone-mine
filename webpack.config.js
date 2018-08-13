const path = require('path');
const webpack = require('webpack');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
    mode: env || 'development',

    entry: {
        app: [
            path.resolve(__dirname, 'src/main.ts')
        ]
    },

    // devtool: 'cheap-source-map',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsConfigPathsPlugin()
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: path.join(__dirname, 'src/', `index.html`)
        }),
        new CleanWebpackPlugin(path.join(__dirname, 'dist/')),
        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to: './assets'
            }
        ]),
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: [ /\.vert$/, /\.frag$/ ],
                use: 'raw-loader'
            }
        ]
    },

    node: {
        fs: "empty"
    }
};
