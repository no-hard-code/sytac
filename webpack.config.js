var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV;

var entries = [path.join(__dirname, 'src/App')];
var output = {
  filename: 'bundle.[hash].js',
  path: path.join(__dirname, 'dist')
};

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: "'" + env + "'"
    }
  }),
  new HtmlWebpackPlugin(),
  new ExtractTextPlugin('styles.[hash].css')
];

var devtool = '';

if (env === 'dev') {
  entries = entries.concat(['webpack-dev-server/client?http://localhost:3001']);
  output.path = __dirname;
  devtool = 'source-map';
  plugins.push(new webpack.HotModuleReplacementPlugin({
    inject: 'body'
  }));
}

module.exports = {
  entry: entries,
  output: output,
  devtool: devtool,
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: plugins,
  devServer: {
    port: 3001,
    hot: true,
    watchOptions: {
      ignored: /node_modules/
    },
    stats: { colors: true },
    historyApiFallback: true
  },
};
