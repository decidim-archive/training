'use strict';

var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
var getClientEnvironment = require('./env');
var paths = require('./paths');

var publicPath = '/';
var publicUrl = '';
var env = getClientEnvironment(publicUrl);

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    publicPath: publicPath
  },
  devtool: 'inline-source-map',
  resolve: {
    fallback: paths.nodePaths,
    extensions: ['.js', '.json', '.jsx', ''],
    // alias: {
    //   'react-native': 'react-native-web'
    // }
  },

  module: {
    preLoaders: [
      { test: /\.(js|jsx)$/, loader: 'eslint', include: paths.appSrc, }
    ],
    loaders: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)(\?.*)?$/,
          /\.scss$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      { test: /\.(js|jsx)$/, include: paths.appSrc, loader: 'babel', query: { cacheDirectory: true } },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader?sourceMap' ] },
      { test: /\.(woff|woff2|eot|ttf|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?limit=10000&mimetype=application/font-woff', query: {name: 'static/fonts/[name].[hash:8].[ext]'}},
      { test: /\.(png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader', query: { name: 'static/media/[name].[hash:8].[ext]' } },
      { test: /\.json$/, loader: 'json' },
      { test: /\.svg$/, loader: 'file', query: { name: 'static/media/[name].[hash:8].[ext]' } },
    ]
  },

  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new webpack.DefinePlugin(env.stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
