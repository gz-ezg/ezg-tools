const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
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
        }
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