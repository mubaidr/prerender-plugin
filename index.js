const Path = require('path')
const renderer = require('./util/renderer')
const expressServer = require('./util/express-server.js')

function SimpleHtmlPrecompiler (staticDir, routes, options) {
  this.staticDir = staticDir
  this.routes = routes
  this.options = options || {}

  if (!this.options.outputDir) {
    this.options.outputDir = Path.join(staticDir, '../', 'dist-pre-rendered')
  }
}

// eslint-disable-next-line
SimpleHtmlPrecompiler.prototype.apply = async function() {
  const server = await expressServer(this.staticDir)
  const address = server.address()

  Promise.all(
    this.routes.map(
      route =>
        new Promise(async(resolve, reject) => {
          await renderer.render(address.port, route, this.options, err => {
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
new SimpleHtmlPrecompiler('../gh-pages/dist', ['/']).apply()
// Debug code end
