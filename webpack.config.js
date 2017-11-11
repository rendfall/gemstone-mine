let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');

let phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
let phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
let pixi = path.join(phaserModule, 'build/custom/pixi.js');
let p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            'pixi',
            'p2',
            'phaser',
            'webfontloader',
            path.join(__dirname, 'src/main.js')
        ]
    },
    devtool: 'source-map',
    output: {
        pathinfo: true,
        path: path.join(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/assets'),
                to: path.resolve(__dirname, 'dist/assets')
            }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }],
                include: path.join(__dirname, 'src')
            },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] }
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }
};
