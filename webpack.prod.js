// webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    // En producción, generará /workspaces/FullStack/dist
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js'
  },
  plugins: [
    new Dotenv({
      safe: true,
      systemvars: true
    })
  ]
});
