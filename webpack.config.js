const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: '././src/js/index.js',
  output: {
    filename: "[name].js",
    path: path.resolve((__dirname, 'dist'))
  },
  plugins: [
    new UglifyJsPlugin(), 
    new HtmlWebpackPlugin({
      title: 'SpaceX Launch Programs',
      template: './src/index.html',
      developer: 'Rajesh Prabhu'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        include: [path.resolve(__dirname, './src/js')],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,      // Extract out CSS into external CSS
          'css-loader',                     // CSS inside JS
          'sass-loader'                     // SCSS to CSS
        ],
      }
    ]
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
}