
let path = require('path');
let webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
      "app":'./index.js'
    },
    mode:"development",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name]_bundle.js",
        publicPath: '/'
    },
    module: {
        rules:[
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ],


    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('app.bundle.css')
    ],
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        // 设置服务器的ip地址，也可以是localhost
        host:'localhost',
        // 设置端口
        port:9999,
        // 设置自动拉起浏览器
        open:true,
        //代码压缩
        compress: true,
        inline:true,
        hot:true

    }


};