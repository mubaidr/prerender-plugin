const FS = require('fs')
const Path = require('path')
const mkdirp = require('mkdirp')
const getHTML = require('./util/get-html')
const expressServer = require('./util/express-server.js')

function SimpleHtmlPrecompiler (staticDir, routes, options) {
  this.staticDir = staticDir
  this.routes = routes
  this.options = options || {
    phantomOptions: '--debug=true'
  }

  if (!this.options.outputDir) {
    this.options.outputDir = Path.join(staticDir, '../', 'dist-pre-rendered')
  }
}

// eslint-disable-next-line
SimpleHtmlPrecompiler.prototype.apply = async function() {
  const server = await expressServer(this.staticDir)
  const address = server.address()

  this.routes.forEach(route => {
    const url = `http://localhost:${address.port}${route}`
    const folder = Path.join(this.options.outputDir, route)
    const file = Path.join(folder, 'index.html')

    let html = getHTML(this.staticDir, url, this.options)

    if (this.options.postProcessHtml) {
      html = this.options.postProcessHtml({
        html,
        route
      })
    }

    mkdirp.sync(folder)
    FS.writeFileSync(file, html)

    // debug
    console.log('Phantom output: ', html)
  })

  setTimeout(() => {
    server.close()
  }, 5000)
}

// Debug code start
new SimpleHtmlPrecompiler('../gh-pages/dist', ['/']).apply()
// Debug code end
