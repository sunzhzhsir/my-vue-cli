//开发环境配置
const { smart: merge } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
module.exports = merge(base, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  //配置webpack-dev-server
  devServer: {
    //自定义端口号
    //port:7000
    //自动打开浏览器
    open: true,
    hot: true, //开启热更新，配合下面webpack.HotModuleReplacementPlugin使用
  },
  plugins: [
    //配置环境变量,定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify("development"),
          //这里可以定义你的环境变量
          //   VUE_APP_URL:JSON.stringify("http://XXXX.com"),
        },
      },
    }),
    //使用webpack提供的热更新插件
    new webpack.HotModuleReplacementPlugin(),
  ],
});
