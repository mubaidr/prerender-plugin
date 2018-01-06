const path = require('path')
const PrerenderPlugin = require('../../')

new PrerenderPlugin({
  source: path.join(__dirname, 'app'),
  target: path.join(__dirname, 'dist')
}).apply()
