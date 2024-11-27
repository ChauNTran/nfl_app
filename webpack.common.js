const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
   entry:{
      index: ['./src/client/index.jsx'],
   },
   plugins: [
      new CleanWebpackPlugin(['./public/js'])
   ],
   output: {
      path: __dirname + '/public/js',
      filename: '[name].js',
      libraryTarget: 'var',
      library: 'packed',
   },
   module: {
      rules: [{
         test: /\.jsx$/,
         exclude: /node_modules/,
         use: {
            loader: 'babel-loader',
            options: {
               presets: ['@babel/preset-react']
            }
         },
      }]
   },
};