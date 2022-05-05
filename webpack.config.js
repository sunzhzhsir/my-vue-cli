/**
 * 小知识：loader和plugin
 * loader:使webpack拥有解析非js文件的能力，如：css,png,ts等
 * plugin:拓展webpack的打包功能，如优化体积，显示进度条等
 *
 * 使用webpack打包功能需要 "webpack": "^5.53.0","webpack-cli": "^4.9.0"
 *
 * 打包html需要用到插件  "html-webpack-plugin": "^5.3.2",
 *
 * 打包css(指打包css样式，不是仅代表打包.css后缀文件)：
 * 打包scss样式文件需要 ：
 * sass，sass-loader：可以将scss代码转成css，
 * css-loader:使webpack具有打包css文件的能力，
 * sass-resources-loader：可选，支持打包全局scss文件，
 * mini-css-extract-plugin:可将css代码打包成一个单独的css文件
 * 打包less样式文件需要 ：
 * less，less-loader：可以将less代码转成css，
 * css-loader:使webpack具有打包css文件的能力，
 *
 * 打包图片，webpack已经废弃url-loader,打包使用asset-module
 *
 * 配置babel,babel针对js文件
 * babel可以将我们项目中高级语法转化成比较低级的语法，比如可以将ES6转为ES5，
 * 这样可以兼容一些低版本浏览器
 * 所需安装包：
 * "@babel/core": "^7.15.0"  "babel-loader": "^8.2.2"：转换语法的工具
 * "@babel/preset-env": "^7.15.0"：转换的一套现成规则
 * "@babel/plugin-transform-runtime": "^7.17.0":转换async/await所需插件
 * 在webpack.config.js文件中单单配置babel-loader是不够的，需要配置babel的转换规则，
 * 根目录下创建babel.config.js文件
 *
 * 打包vue
 * 打包vue需要用到以下几个包：
 * vue:vue开发所需依赖
 * vue-loader:解析.vue文件所需的loader
 * vue-template-compiler:解析vue中的模板工具
 * @vue/babel-preset-jsx:支持解析vue中的jsx语法
 * 需要在babel.config.js文件配置，让wabpack支持vue文件中的jsx语法
 *
 * 配置路径别名
 * 有时候文件引用隔着要多层，引用起来看起来很不明确，比如../../../../App.vue,所以
 * 可以配置一下别名alias
 *
 * 配置webapck-dev-server
 * "webpack-dev-server": "^4.2.1",
 * 在package.json中配置启动命令 "serve":"webpack serve"
 *
 *
 * 区分环境配置
 * 我们不能把所有的配置都配置在一个webpack.config.js中，
 * 因为我们有两个环境，development(开发环境)，production(生产环境),所以我们在根目录下
 * 创建build文件夹，并创建三个文件
 * webpack.base.js：两个环境共用配置
 *   入口，输出配置；
 *   各种文件的处理；
 *   进度条展示；
 *   路径别名
 * webpack.dev.js：开发环境独有配置
 *   webpack-dev-server
 *   不同的source-map模式
 *   不用的环境变量
 * webpack.prod.js：生产环境独有
 *   不同的source-map模式
 *   不用的环境变量
 * 首先需要安装一个合并插件:
 * "webpack-merge": "^4.2.2":用于两个环境的配置可以合并公共的配置
 * 然后再根目录下新建build文件夹，并新建
 * webpack.base.js，webpack.dev.js，webpack.prod.js文件
 * 最后配置package.json命令
 * "serve":"webpack serve --config ./build/webpack.dev",
 * "build":"webpack --config ./build/webpack.prod"
 *
 * 配置进度条
 * 首先安装插件
 * progress-bar-webpack-plugin
 *
 * 配置source-map
 * source-map的作用：代码报错时，能快速定位到出错位置
 * development：使用eval-cheap-module-source-map模式，
 *   能具体定位到源码位置和源码展示，适合开发模式，体积较小；
 * production：使用nosources-source-map，
 *   只能定位到源码位置，不展示源码，体积较小，适合生产模式
 *
 *
 * 环境变量配置。具体见webpack.dev.js，webpack.prod.js
 *
 * 以上是基础搭建部分，以下是优化部分：
 * 构建时间优化：
 * thread-loader:多进程打包，大大提高打包速度，
 *   使用方法是将thread-loader放在比较费时的loader之前，比如babel-loader
 * cache-loader:缓存资源，提高二次构建的速度，
 *   使用方法是将thread-loader放在比较费时的loader之前，比如babel-loader
 *
 * 开启热更新：
 * 比如修改了一个项目中某一个文件，会导致整个项目刷新，非常消耗时间，
 * 如果只刷新修改的这个模块，其他保持原状，将大大提高修改代码的重新构建时间
 * 只用于 开发中，所以配置在webpack.dev.js
 * plugins: [
 *   //使用webpack提供的热更新插件
 *   new webpack.HotModuleReplacementPlugin(),
 * ],
 * devServer: {
 *   //开启热更新，配合下面webpack.HotModuleReplacementPlugin使用
 *   hot: true,
 * },
 *
 * exclude&include
 * exclude:不需要处理的文件
 * include:需要处理的文件
 *
 * 打包体积优化：
 * css代码压缩：
 * css代码压缩使用 css-minimizer-webpack-plugin,效果压缩去重
 * 代码压缩比较耗时间，所以只用在打包项目时，所以只需要在webpack.prod.js中配置
 * JS代码压缩：
 * JS代码压缩使用 terser-webpack-plugin,实现打包后JS代码压缩
 * 代码压缩比较耗时间，所以只用在打包项目时，所以只需要在webpack.prod.js中配置
 *
 */
const path = require("path"); // CommonJS语法
const HtmlWebpackPlugin = require("html-webpack-plugin"); //引入html打包插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //将css代码打包成一个单独的css文件
const { VueLoaderPlugin } = require("vue-loader"); //解析.vue文件
const ProgressBarPlugin = require("progress-bar-webpack-plugin"); //配置进度条
const chalk = require("chalk"); //配置进度条相关
module.exports = {
  //模式：开发模式
  mode: "development",
  //   devtool: "eval-cheap-module-source-map", //开发模式，配置到webpack.dev.js中
  //   devtool: "nosources-source-map",//生产模式，配置到webpack.prod.js中
  //入口文件
  //   entry: {
  //     main: "./src/main.js",
  //   },
  //入口文件
  entry: path.join(__dirname, "src", "main.js"),
  //输出
  output: {
    //输出到dist文件夹
    path: path.resolve(__dirname, "./dist"),
    //js文件下
    filename: "js/chunk-[contenthash].js",
    //每次打包前自动清除旧的dist
    clean: true,
  },

  //插件都放在plugins中,是个数组
  plugins: [
    //配置html打包配置
    new HtmlWebpackPlugin({
      //选择模板 public/index.html
      template: "./public/index.html",
      //打包后的名字
      filename: "index.html",
      //js文件插入body里
      inject: "body",
    }),
    // 将css代码打包成一个单独的css文件
    new MiniCssExtractPlugin({
      // 将css代码输出到dist/styles文件夹下
      filename: "styles/chunk-[contenthash].css",
      ignoreOrder: true,
    }),
    //解析vue文件
    new VueLoaderPlugin(),
    //配置进度条
    new ProgressBarPlugin({
      format: `build [:bar] ${chalk.green.bold(":percent")}(:elapsed seconds)`,
    }),
  ],

  //配置打包loader,是个对象
  module: {
    rules: [
      {
        //匹配文件后缀的规则
        test: /\.(css|s[cs]ss)$/,
        use: [
          //loader执行顺序从右到左（从下到上）
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          //配置全局引入
          {
            loader: "sass-resources-loader",
            options: {
              //放置全局样式文件
              resources: ["./src/styles/mixins.scss"],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          //loader执行顺序从右到左（从下到上）
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
        ],
        include: path.join(__dirname, "src"), //只匹配打包src下的
        exclude: /node_modules/, //过滤
      },
      {
        test: /\.(jpg|png|svg|gif|jpe?g|webp)$/,
        type: "asset",
        generator: {
          //打包到dist/images文件夹下
          filename: "images/[contenthash][ext][query]",
        },
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 100 * 1024, //大于100kb则是拷贝，小于则是base64
          },
        },
      },
      {
        //匹配js文件
        test: /\.js$/,
        //thread-loader,时间优化，提高打包速度,cache-loader:缓存资源，提高二次构建的速度，
        use: ["cache-loader", "thread-loader", "babel-loader"],
        exclude: /node_modules/, //过滤
      },
      //匹配vue文件
      {
        test: /.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  resolve: {
    //配置别名alias
    alias: {
      "@": path.resolve("./src"), //配置前，../../../../App.vue  配置后 @/App.vue,此时@代表目录src
      asset: "~/assets",
      tools: "~/tools",
    },
    //因为文件时省略后缀
    extensions: [".js", ".ts", ".less", ".vue"],
  },
  //配置webpack-dev-server
  devServer: {
    //自定义端口号
    //port:7000
    //自动打开浏览器
    open: true,
  },
};
