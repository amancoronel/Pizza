var htmlWebpackPlugin = require('html-webpack-plugin');
var htmlWebpackPugPlugin = require('html-webpack-pug-plugin');
var path = require('path');

module.exports = {
    entry : "./src/js/index.js",
    output : {
        path : path.join(__dirname, "/src/js/build"),
        filename : "script_bundle.js"
    },
    module : {
        rules : [
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use : {
                    loader : "babel-loader"
                }
            },
            {
                test : /\.css$/,
                use : ["style-loader", "css-loader"]
            }
        ]
    },
    plugins : [
        new htmlWebpackPlugin({
            template : "./views/index.pug"
        }),
        new htmlWebpackPugPlugin()
    ]
}