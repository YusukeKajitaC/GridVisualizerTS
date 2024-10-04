const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',               // 出力ファイル名
    path: path.resolve(__dirname, 'build'),  // 出力先
    library: 'GridVisualizerTS',                // グローバル変数名
    libraryTarget: 'umd',                // UMD形式でライブラリを公開
    globalObject: 'this',                // ブラウザでもNode.jsでも動作するように
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};