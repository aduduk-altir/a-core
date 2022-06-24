const path = require('path');

const relativeDefaults = {
  src: 'src',
  public: 'public',
  build: 'build',
};

const fileNamesDefaults = {
  tsConfig: 'tsconfig.json',
  mainHtmlTemplate: 'index.html',
  mainEntry: 'index.tsx',
  envEntry: 'env.ts',
  dotEnvLocal: '.env.local',
  serviceWorkerEntry: 'sw.js'
}

module.exports = ({ root, relative, fileNames, files, ...other }) => {
  const localRelative = { ...relativeDefaults, ...relative };
  const localFileNames = { ...fileNamesDefaults, ...fileNames };
  const localFiles = {
    tsConfig: localFileNames.tsConfig,
    mainHtmlTemplate: path.join(localRelative.public, localFileNames.mainHtmlTemplate),
    mainEntry: path.join(localRelative.src, localFileNames.mainEntry),
    envEntry: path.join(localRelative.src, localFileNames.envEntry),
    dotEnvLocal: localFileNames.dotEnvLocal,
    serviceWorkerEntry: path.join(localRelative.src, localFileNames.serviceWorkerEntry),
    ...files
  }

  return {
    // absolute entries
    src: path.resolve(root, localRelative.src),
    public: path.resolve(root, localRelative.public),
    build: path.resolve(root, localRelative.build),
    tsConfig: path.resolve(root, localFiles.tsConfig),
    mainHtmlTemplate: path.resolve(root, localFiles.mainHtmlTemplate),
    mainEntry: path.resolve(root, localFiles.mainEntry),
    envEntry: path.resolve(root, localFiles.envEntry),

    // relative entries and file names
    relative: localRelative,
    fileNames: localFileNames,
    files: localFiles,
    ...other
  };
};
