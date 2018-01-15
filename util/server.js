const express = require('express')
const portfinder = require('portfinder')
const compression = require('compression')
const minify = require('express-minify')

module.exports = {
  build: async root => {
    let port

    try {
      port = await portfinder.getPortPromise()
    } catch (err) {
      throw err
    }

    const app = express()
    app.use(compression())
    app.use(minify())
    app.use(express.static(root))
    return app.listen(port)
  }
}
