const path = require('path');
const webpack = require('webpack');
const PrefreshPlugin = require('@prefresh/webpack');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  name: 'test',
  mode: 'development',
  entry: ['webpack-hot-middleware/client?dynamicPublicPath=true&path=hmr', './src/index.jsx'],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'client'),
    publicPath: 'http://localhost:8888/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-react', { runtime: 'classic', pragma: 'h' }]],
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new PrefreshPlugin()],
};
