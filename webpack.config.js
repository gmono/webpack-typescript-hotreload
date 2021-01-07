const path = require('path');
const wp=require("webpack");
const html=require("html-webpack-plugin")
module.exports = {
  entry: "./src/test.tsx",
  mode:"development",
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    hotUpdateChunkFilename: 'hot/hot-update.js',  //指定热替换补丁js文件和json描述文件生成路径 ，每次文件变化都会生成一次
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot:true,
    hotOnly:true
  },
  plugins:[
    new html({
      title: 'Output Management',
      inject:true,
      filename:'index.html',
      template:'index.html'
    }),
    new wp.HotModuleReplacementPlugin()
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          minChunks: 1,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }

      },
    }
  }
};
