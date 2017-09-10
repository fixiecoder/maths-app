const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
/*

  requires src structure:

  - src
    - assets
    - html
    - js
    - styles

  dev dependencies:

    - babel-core
    - babel-loader
    - babel-preset-es2015
    - babel-preset-react
    - css-loader
    - extract-text-webpack-plugin
    - file-loader
    - html-webpack-plugin
    - node-sass
    - sass-loader
    - style-loader
    - uglifyjs-webpack-plugin
    - webpack
    - webpack-dev-server
    
    npm i --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react css-loader extract-text-webpack-plugin file-loader html-webpack-plugin node-sass sass-loader style-loader uglifyjs-webpack-plugin webpack webpack-dev-server

*/

const isProduction = process.env.BUILD_ENV === 'production';
const productionPlugins = isProduction ? [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new UglifyJSPlugin()
] : [];

module.exports = {
  context: __dirname,
  entry: {
    main: './src/js/index',
    vendor: [
      'uuid',
      'react'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src',
              name: '[path][name].[hash].[ext]'
            }  
          }
        ]
      },
      {
        test: /robots\.txt$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src',
              name: 'robots.txt'
            }  
          }
        ]
      }
    ]
  },

/*
  resovle: {

  },
*/

  plugins: [
    new WebpackCleanupPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/html/index.html'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new ExtractTextPlugin('styles.css'),
    ...productionPlugins
  ],

  devtool: isProduction ? false : 'source-map',

  devServer: {
    contentBase: './dist',
    port: 3000,
    historyApiFallback: true
  }
};
