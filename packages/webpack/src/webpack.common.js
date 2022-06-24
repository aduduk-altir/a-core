const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (paths) => ({
  target: 'web',
  entry: {
    env: {
      import: paths.envEntry,
      filename: 'public/env.js',
    },
    main: paths.mainEntry,
  },
  output: {
    filename: 'static/js/[name].[contenthash].bundle.js',
    chunkFilename: 'static/js/[name].[contenthash].bundle.js',
    path: paths.build,
    clean: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({configFile: paths.tsConfig})],
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
          tsconfigRaw: require(paths.tsConfig),
        },
        // TODO: remove `@altir` part
        exclude: /node_modules\/(?!@altir)/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          globOptions: {
            ignore: ['**/*.html'],
          },
          to: path.resolve(paths.build, paths.relative.public),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      showErrors: true,
      // TODO: check why it's false
      cache: false,
      template: paths.mainHtmlTemplate,
      chunks: [
        'env',
        'main',
      ]
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new ForkTsCheckerPlugin(),
  ],
});
