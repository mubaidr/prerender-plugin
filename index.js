const FS = require('fs')
const Path = require('path')
const mkdirp = require('mkdirp')
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
          const url = `http://localhost:${address.port}${route}`
          const folder = Path.join(this.options.outputDir, route)
          const file = Path.join(folder, 'index.html')

          renderer.render(this.staticDir, url, this.options, html => {
            try {
              mkdirp.sync(folder)
              FS.writeFileSync(file, html)

              // debug
              console.log('(Phantom) ', html)

              resolve()
            } catch (err) {
              reject(err)
            }
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
