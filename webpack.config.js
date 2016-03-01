const webpack = require('webpack');

module.exports = {
  entry : [
    "./client/index"
  ],
  output : {
    filename : 'index.js',
    path : __dirname + '/dist'
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module : {
    loaders : [
      {
        test : /\.js$/,
        exclude : /node_modules/,
        loader : 'babel'
      },
      {
        test : /\.styl$/,
        loader : 'style-loader!css-loader!stylus-loader'
      },
      {
        test : /\.css$/,
        loader : 'style-loader!css-loader'
      }
    ],
  },
};
