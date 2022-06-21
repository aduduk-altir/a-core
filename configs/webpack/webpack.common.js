const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const createPaths = require('./paths');

module.exports = (options) => {
  const paths = createPaths(options.root);

  return {
    target: 'web',
    entry: {
      env: {
        import: path.resolve(paths.src, 'env.ts'),
        filename: 'public/env.js',
      },
      main: path.resolve(paths.src, 'index.tsx'),
    },
    output: {
      filename: 'static/js/[name].[contenthash].bundle.js',
      chunkFilename: 'static/js/[name].[contenthash].bundle.js',
      path: paths.build,
      clean: true,
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin({ configFile: options.tsConfigPath })],
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
            tsconfigRaw: require(options.tsConfigPath),
          },
          exclude: /node_modules/,
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
            to: path.resolve(paths.build, 'public'),
          },
        ],
      }),
      new HtmlWebpackPlugin({
        showErrors: true,
        cache: true,
        template: path.resolve(paths.public, 'index.html'),
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
  };
};
