const path = require('path')
const PrerenderPlugin = require('prerender-plugin')

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
}).apply()
