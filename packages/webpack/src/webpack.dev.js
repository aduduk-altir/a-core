const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (paths) => ({
  mode: 'development',
  devServer: {
    hot: true,
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    static: {
      directory: paths.build,
    },
  },
  cache: {
    type: 'filesystem',
  },
  devtool: 'cheap-module-source-map',
  plugins: [new Dotenv({ path: `./${paths.files.dotEnvLocal}` }), new ReactRefreshWebpackPlugin()],
  optimization: {
    // Fixes HMR for multi-entry
    // https://github.com/webpack/webpack-dev-server/issues/2792
    runtimeChunk: 'single',
  },
});
