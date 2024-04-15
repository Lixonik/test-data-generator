const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const projectInfo = require('./projectInfo');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: projectInfo.minifiedLibraryFileName,
    library: projectInfo.minifiedLibraryName,
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            properties: {
              regex: /^_/,
            },
          },
          compress: {
            drop_console: true,
          },
        },
      })
    ],
  },
};
