const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

module.exports = (options) => (envVars) => {
  const { env } = envVars;
  const envConfig = require(`./webpack.${env}.js`);

  return merge(commonConfig(options), envConfig(options));
};
