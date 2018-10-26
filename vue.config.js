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
    }
}