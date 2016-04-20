const path = require('path');

const PATHS = {
    app: path.join(__dirname, 'sources/js/'),
    build: path.join(__dirname, 'public')
};

module.exports = {
    entry: {
        app: PATHS.app + 'app.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build + '/js',
        filename: 'streetlives.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: PATHS.app
            }
        ]
    }
};