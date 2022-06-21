const path = require('path');

module.exports = (dirname) => ({
  src: path.resolve(dirname, '../src'),
  public: path.resolve(dirname, '../public'),
  build: path.resolve(dirname, '../build'),
});
