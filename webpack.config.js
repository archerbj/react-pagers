var path = require('path');
var package = require('./package.json');

module.exports = {
  cache: true,
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.(jsx|es6)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|less)$/,
        loader: 'style!css!less'
      }
    ]
  },
  entry: {
    'bundle': './src/javascript/'+ package.name +'-example.jsx'
  },
  output: {
    path: path.join(__dirname, 'dist', 'javascript'),
    filename: '[name].js'
  },
  resolve: {
    root: process.cwd(),
    moduleDirectories: ['node_modules', 'src/javascript']
  }
};
