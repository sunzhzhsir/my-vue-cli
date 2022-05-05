//生产环境配置
const { smart: merge } = require("webpack-merge");
const base = require("./webpack.base");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //CSS代码压缩;
const TerserPlugin = require("terser-webpack-plugin"); //JS代码压缩
module.exports = merge(base, {
  mode: "production",
  devtool: "nosources-source-map",
  plugins: [
    //配置环境变量,定义全局变量
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_DEV: JSON.stringify("production"),
          //这里可以定义你的环境变量
          //   VUE_APP_URL:JSON.stringify("http://XXXX.com"),
        },
      },
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), //CSS代码压缩去重;
      new TerserPlugin({
        //JS代码压缩
        terserOptions: {
          compress: {
            drop_console: true, //去除console
          },
        },
      }),
    ],
  },
});
