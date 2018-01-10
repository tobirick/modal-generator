var path = require('path');
var webpack = require('webpack');
module.exports = {
    watch: true,
    entry: ["./src/app.js"],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015'
                    ]
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};