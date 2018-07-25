const path = require('path')

const sourcepath = "./source/js";


module.exports = {
    entry: {
        primary: `${sourcepath}/primary.es6.js`,
        schedule: `${sourcepath}/schedule.es6.js`
    },
    output: {
        path: path.resolve(__dirname, './public/js'),
        //library: 'lib'
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.es6\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}