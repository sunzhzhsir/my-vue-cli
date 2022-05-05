//公共配置
const path = require("path"); // CommonJS语法
const HtmlWebpackPlugin = require("html-webpack-plugin"); //引入html打包插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //将css代码打包成一个单独的css文件
const { VueLoaderPlugin } = require("vue-loader"); //解析.vue文件
module.exports = {
  //入口文件
  //   entry: {
  //     main: "./src/main.js",
  //   },
  //入口文件
  entry: path.join(__dirname, "../src", "main.js"),
  //输出
  output: {
    //输出到dist文件夹
    path: path.resolve(__dirname, "../dist"),
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
        include: path.join(__dirname, "../src"), //只匹配打包src下的
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
        use: ["cache-loader", "thread-loader", "babel-loader"], //thread-loader,时间优化，提高打包速度
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
    },
    //因为文件时省略后缀
    extensions: [".js", ".ts", ".less", ".vue"],
  },
};
