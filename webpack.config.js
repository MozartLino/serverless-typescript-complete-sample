const path = require('path');
const slsw = require('serverless-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  resolve: {
    extensions: ['.mjs', '.json', '.ts', '.js', 'jsx', 'tsx'],
    symlinks: false,
    cacheWithContext: false,
  },
  devtool: 'source-map',
  stats: 'errors-only',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [],
  optimization: {
    minimize: !slsw.lib.webpack.isLocal,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};
