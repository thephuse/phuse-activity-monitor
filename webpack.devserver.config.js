const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry : [
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    "./client/index"
  ],
  output : {
    filename : 'index.js',
    path : __dirname + '/dist',
    publicPath: 'http://localhost:4000/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module : {
    loaders : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        loaders : ['react-hot', 'babel']
      },
      {
        test : /\.styl$/,
        exclude : /node_modules/,
        loader : 'style-loader!css-loader!stylus-loader'
      }
    ],
  },
};
