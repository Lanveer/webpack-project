
let path = require('path');
let webpack = require('webpack');
module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [

        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        // 设置服务器的ip地址，也可以是localhost
        host:'localhost',
        // 设置端口
        port:9999,
        // 设置自动拉起浏览器

        //代码压缩
        compress: true,
        open:true,
        inline:true,
        hot:true

    }


};