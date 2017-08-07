const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const path = require('path');

module.exports = {
  entry: {
    app: './main.bootstrap',
  },
  devtool: 'source-map',
  context: path.join(__dirname, '..', 'demo'),
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      '@ngx-loading-bar/core': path.join(__dirname, '..', 'packages/core'),
      '@ngx-loading-bar/http': path.join(__dirname, '..', 'packages/http'),
    },
    modules: [
      'node_modules',
    ]
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
  ],
  output: {
    path: path.join(__dirname, '..', 'build'),
    publicPath: '/build/',
    filename: 'demo.js',
  },
};
