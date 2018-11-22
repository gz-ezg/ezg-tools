const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    // pages: {
    //     index: {
    //         entry: "src/main.js",
    //         template: "public/index.html",
    //         filename: "index.html"
    //     },
    //     page2: {
    //         entry: "src/main.js",
    //         template: "public/index.html",
    //         filename: "page2.html"
    //     }
    // },
    devServer: {
        proxy: {
            "/api": {
                target: "http://192.168.0.220:9000",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        },
        disableHostCheck: true,
    },
    // configureWebpack: {
    //     plugins: [
    //         new CopyWebpackPlugin([
    //             {
    //               from: path.resolve(__dirname, '../public/static'),
    //               to: "/",
    //               ignore: ['.*']
    //             }
    //         ])
    //     ]
    // }

}