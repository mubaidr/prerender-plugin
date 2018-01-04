const Path = require('path')
const defaults = require('lodash.defaultsdeep')
const renderer = require('./util/renderer')
const expressServer = require('./util/express-server.js')

const _options = {}

function HtmlPrerenderer (options) {
  this.options = options || {}
  defaults(this.options, _options)

  if (!this.options.target) {
    this.options.target = Path.join(
      this.options.source,
      '../',
      'dist-pre-rendered'
    )
  }
}

// eslint-disable-next-line
HtmlPrerenderer.prototype.apply = async function() {
  const server = await expressServer(this.options.source)
  this.options.address = server.address()

  Promise.all(
    this.options.routes.map(
      route =>
        new Promise(async(resolve, reject) => {
          await renderer.render(route, this.options, err => {
            if (err) reject(err)

            resolve()
          })
        })
    )
  )
    .catch(err => {
      setTimeout(() => {
        throw err
      }, 0)
    })
    .then(() => {
      server.close()
    })
}

// Debug code start
new HtmlPrerenderer({
  source: '../gh-pages/dist',
  routes: ['/']
}).apply()
// Debug code end
