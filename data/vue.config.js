module.exports = {
  lintOnSave: false,
  productionSourceMap: false, //  不打包source map 文件，不需要输出console语句
  outputDir: './vueDist', // 输出目录
  // 根据环境变量设置 打包后静态资源地址
  publicPath: process.env.NODE_ENV === 'production' ? 'http://xiejun2019.gitee.io/vue' : '/',
  assetsDir: 'assets',  // 将所有静态资源统一到该文件夹下
}
