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
    lintOnSave: false,
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    
        // 或者
        // 修改它的选项：
        // config.plugin('prefetch').tap(options => {
        //   options[0].fileBlacklist = options[0].fileBlacklist || []
        //   options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
        //   return options
        // })
    },
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