const path = require('path');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
  },
  cache: {
    type: 'filesystem',
  },
  devtool: 'cheap-module-source-map',
  plugins: [new Dotenv({ path: './.env.local' }), new ReactRefreshWebpackPlugin()],
  optimization: {
    // Fixes HMR for multi-entry
    // https://github.com/webpack/webpack-dev-server/issues/2792
    runtimeChunk: 'single',
  },
};
