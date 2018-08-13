# webpack
webpack build project

# 1.first step  create project files and then install webpack global in your computer

npm init -y

# get such json files
{
  "name": "webpack-dome",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
# 2.npm install webpack webpack-cli -g

npm webpack webpack-cli -g 用来下载webpack webpack-cli最新版本，后面的-g 是全局安装。为了使用方便 建议全局安装和本地安装一起

# 3. 项目中安装webpack

npm install webpack --save-dev
npm install webpack-cli -D --save-dev

 webpack4 是零配置 所以我们直接启动一次看看 在命令行列 直接输入 webpack 然后回车， 然后不出意外的话会报出 mode option has not been set的错误，原因就是没有申明打包的环境是什么
 ，解决办法就是加上打包的环境
 "scripts": {
   "dev": "webpack --mode development", //打包出来的代码不会被压缩，
   "build": "webpack --mode production"  //代码会被压缩
 }

# 4.修改之前生成的package.json文件

{
  "name": "webpack-dome",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
     "webpack": "^4.8.1",
     "webpack-cli": "^2.1.3"
  }
}

# 5.运行npm run dev

这个时候如果一切正常的话在根目录下面就会出现dist文件夹


# 6 配置web-server 服务器
npm install webpack-dev-server --save-dev

#7. 然后再package.json中修改配置文件

"scripts": {
    "dev": "webpack-dev-server --mode development",  //注意加上webpack-dev-server
  },

  #  需要注意的点是：
  1.index.html这个主入口文件要放在dist文件夹下面，这样才能直接引入打包好的bundle.js文件。
  2. 这个文件可以简写在packag.json中也能在webpack.config.js中进行详细的配置
  devServer:{
            contentBase:path.resolve(__dirname,'dist'),
            // 设置服务器的ip地址，也可以是localhost
            host:'localhost',
            // 设置端口
            port:9999,
            // 设置自动拉起浏览器
            open:true
        }

        3. webpack的热更新
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
                open:true,
                inline:true,
                hot:true

            }

            #实现热加载





            # 处理less文件
            1. 安装  npm i less less-loader -D
            2. 安装  npm install style-loader --save-dev  npm install css-loader --save-dev
            3. 配置文件中引用 const ExtractTextPlugin = require('extract-text-webpack-plugin');
            4.添加规则            rules:[
                                    {
                                        test: /\.less$/,
                                        use: ExtractTextPlugin.extract({
                                            fallback: 'style-loader',
                                            use: ['css-loader', 'less-loader']
                                        })
                                    }
                                ]

             尤其需要注意的地方是目前的extract-text-webpack-plugin 没有匹配webpack4.x的版本，所以总是会报错
             解决办法就是安装和webpack匹配的  npm install extract-text-webpack-plugin@next  --save-dev
             便可以解决



          # 处理ES6转化成ES5

          1.添加babelrc 文件

          2. 安装需要的解码文件
           npm install babel-core babel-preset-es2015 babel-loader --save-dev

          3.配置文件
             {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
             }




# 清除多余的css文件，将打包后的html中冗余的css文件按需加载，没有引用的就不

const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

     //css purify
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, '*.html'))
        })





