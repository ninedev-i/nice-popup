'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
   context: __dirname,
   entry: './src/app.js',
   output: {
      path: __dirname + '/dist',
      publicPath: __dirname + '/dist',
      filename: 'app.js',
      library: 'NicePopup',
      libraryTarget: 'umd'
   },

   watchOptions: {
      aggregateTimeout: 100
   },
   mode: NODE_ENV,
   devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : false,
   devServer: {
      contentBase: __dirname,
      publicPath: '/dist/',
      hot: true,
      inline: true,
      open: true,
      progress: true,
      port: 3000
   },

   target: 'node',

   plugins: [
      new ExtractTextPlugin({ filename: 'app.css' })
   ],
   module: {
      rules: [
         {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
               presets: ['@babel/preset-env']
            }
         },
         {
            test: /\.less$/,
            loader: 'less-loader'
         },
         {
            test: /\.css$/,
            // loader: 'style-loader!css-loader',
            use: ExtractTextPlugin.extract({
               use: 'css-loader',
               fallback: 'style-loader'
            })
         },
         {
            test: /\.html$/,
            loader: 'html-loader'
         }
      ]
   }
};