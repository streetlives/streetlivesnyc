const webpack = require('webpack');
var config = require('./webpack.base.config.js')

config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
])

module.exports = config

