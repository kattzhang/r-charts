const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './examples/main.js',
  output: {
    path: resolve('examples/public'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [resolve('node_modules')],
      },
      {
        test: /\.less$/,
        use: [ 'style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('examples/index.html'),
      inject: true
    }),
  ],
  devServer: {
    port: 8089,
    inline: true,
    hot: true,
    contentBase: resolve('examples/public'),
    stats: 'errors-only',
    open: true
  },
}
