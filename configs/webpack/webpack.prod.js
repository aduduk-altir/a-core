const webpack = require('webpack');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = (options) => ({
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        fonts: {
          test: /[\\/]fonts/,
          name: 'fonts',
          chunks: 'initial',
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.STRIPE_KEY': JSON.stringify(process.env.STRIPE_KEY),
    }),
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'sw.js',
      include: [],
    }),
  ],
});
