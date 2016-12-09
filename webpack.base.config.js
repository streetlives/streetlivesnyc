const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer')({browsers: 'last 2 versions'});

const PATHS = {
    app: path.join(__dirname, 'sources'),
    app_js: path.join(__dirname, 'sources', 'js'),
    app_scss: path.join(__dirname, 'sources', 'scss'),
    build: path.join(__dirname, 'public')
};

module.exports = {
    entry: {
        app: PATHS.app + '/js/app.js'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react')
        }
    },
    output: {
        path: PATHS.build,
        filename: 'streetlives.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: PATHS.app_js
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!sass'),
                include: PATHS.app_scss
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        new ExtractTextPlugin('streetlives.css'),
    ]
};
