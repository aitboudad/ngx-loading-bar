const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');

module.exports = {
  entry: {
    app: './main.bootstrap.ts',
    vendor: ['@angular/core'],
  },
  devtool: 'source-map',
  context: path.join(__dirname, '..', 'demo'),
  resolve: {
    extensions: ['.ts', '.webpack.js', '.web.js', '.js'],
    alias: {
      'ng-loading-bar': 'src/index.ts',
    },
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader?declaration=false', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new DashboardPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
  ],
  output: {
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/build/',
    filename: 'demo.js',
  },
};
