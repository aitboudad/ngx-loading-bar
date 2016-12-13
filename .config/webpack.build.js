const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  output: {
    path: __dirname + '/../bundles',
    filename: 'ng-loading-bar.umd.js',
    libraryTarget: 'umd',
    library: 'ng-loading-bar'
  },
  plugins: [
    new CheckerPlugin(),
  ],
  externals: [
    /^\@angular\//,
    /^rxjs\//
  ],
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      }
    ]
  }
};
