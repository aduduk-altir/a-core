const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

/**
 * typedef Options
 * @property {string} root
 * @property {string} tsConfigPath
 */

/**
 * Creates webpack config factory
 * @param {Options} options
 * @returns {function(*): *}
 */
module.exports = (options) => (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);

  return merge(commonConfig(options), envConfig(options));
};
