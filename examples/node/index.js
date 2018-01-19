const path = require('path')
const PrerenderPlugin = require('prerender-plugin')

new PrerenderPlugin({
  source: path.join(__dirname, 'app'),
  target: path.join(__dirname, 'dist'),
  capture: {
    event: 'onload',
    selector: 'randomThingSelector'
  }
}).apply()
