const express = require('express')
const portfinder = require('portfinder')
const compression = require('compression')
const minify = require('express-minify')
const history = require('connect-history-api-fallback')

module.exports = {
  build: async root => {
    let port

    try {
      port = await portfinder.getPortPromise()
    } catch (err) {
      throw err
    }

    const app = express()
    app.use(history())
    app.use(compression())
    app.use(minify())
    app.use(express.static(root))
    return app.listen(port)
  }
}
