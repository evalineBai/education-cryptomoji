const path = require('path');
const SOURCE_DIR = path.join(__dirname, '/source');
const PUBLIC_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SOURCE_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: PUBLIC_DIR
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SOURCE_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css']
  }
};
