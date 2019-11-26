const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './examples/src/main.js',
  output: {
    path: resolve('examples/public'),
    filename: 'index.js',
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
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [resolve('node_modules')],
      },
      {
        test: /\.(less|css)$/,
        use: [ 'style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('examples/src/index.html'),
      inject: true
    }),
  ],
  devServer: {
    port: 8085,
    hot: true,
    publicPath: '/',
    stats: 'errors-only',
    open: true
  },
}
