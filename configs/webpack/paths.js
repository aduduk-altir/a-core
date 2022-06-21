const path = require('path');

module.exports = ({ root, tsConfigPath = 'tsconfig.json'}) => ({
  src: path.resolve(root, 'src'),
  public: path.resolve(root, 'public'),
  build: path.resolve(root, 'build'),
  tsConfig: path.resolve(root, tsConfigPath)
});
