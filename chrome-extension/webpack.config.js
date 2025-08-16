const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  return {
    entry: {
      background: './src/background.ts',
      content: './src/content.ts',
      popup: './src/popup.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true,
    },
    devtool: isDev ? 'inline-source-map' : false,
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'public', to: '.' },
        ],
      }),
      isDev && new webpack.HotModuleReplacementPlugin(),
    ].filter(Boolean),
    watch: isDev,
    watchOptions: {
      ignored: /node_modules/,
    },
    optimization: {
      minimize: !isDev,
    },
    devServer: isDev ? {
      hot: true,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      devMiddleware: {
        writeToDisk: true,
      },
      port: 3001,
      open: false,
    } : undefined,
    mode: isDev ? 'development' : 'production',
  };
};
