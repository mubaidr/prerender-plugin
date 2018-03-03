const path = require('path')
const webpack = require('webpack')
const PrerenderPlugin = require('prerender-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    publicPath: '/app/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new PrerenderPlugin({
      source: path.join(__dirname, 'app'),
      target: path.join(__dirname, 'dist'),
      routes: ['/'],
      capture: {
        delay: 3000
        // selector: 'mySelectorFromDocument',
        // event: 'myEventRaisedFromDocument'
      },
      postProcess: (content, route) => {
        console.log(content, route)
        // Modify content as necessary
        // update title etc
        return content
      }
    })
  ])
}
