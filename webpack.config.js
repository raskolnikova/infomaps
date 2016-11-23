var webpack = require('webpack');

module.exports = {
    entry: "./client/main.js",
    output: {
        path: __dirname + '/publi',
        publicPath: "build/",
        filename: "bundle.js"
    },
    plugins: [
  new webpack.ProvidePlugin({
    $: "jquery/dist/jquery.min.js",
    jQuery: "jquery/dist/jquery.min.js",
    "window.jQuery": "jquery/dist/jquery.min.js"
  })
],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: [/node_modules/, /public/]
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader"
            }, {
                test: /\.less$/,
                loader: "style-loader!css-loader!autoprefixer-loader!less"
            }, {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }, {
                test: /\.gif$/,
                loader: "url-loader?limit=10000&mimetype=image/gif"
            }, {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&mimetype=image/jpg"
            }, {
                test: /\.png$/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            }, {
                test: /\.svg/,
                loader: "url-loader?limit=26000&mimetype=image/svg+xml"
            }, {
                test: /\.jsx$/,
                loader: "react-hot!babel?optional=runtime",
                exclude: [/node_modules/, /public/]
            }, {
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file?name=public/fonts/[name].[ext]'
            }
        ]
    }
}
