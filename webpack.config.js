
let path = require('path');
let webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const  cleanWebpackPlugin=require('clean-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
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
        new ExtractTextPlugin('app.bundle.css'),
        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            inject:true,
            filename:'index.html',
            title:'htmlplugin test',
            template:'./index.html'
        }),
        //css purify
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, '*.html'))
        }),
        //js优化
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: true, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        })
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