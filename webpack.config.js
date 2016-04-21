const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer')({browsers: 'last 2 versions'});

const PATHS = {
    app: path.join(__dirname, 'sources'),
    build: path.join(__dirname, 'public')
};

module.exports = {
    entry: {
        app: PATHS.app + '/js/app.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'streetlives.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: PATHS.app + '/js'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!sass'),
                include: PATHS.app + '/scss'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        new ExtractTextPlugin('streetlives.css')
    ]
};