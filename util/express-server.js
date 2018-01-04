const express = require('express')
const portfinder = require('portfinder')

module.exports = async root => {
  let port

  try {
    port = await portfinder.getPortPromise()
  } catch (err) {
    throw err
  }

  const app = express()
  app.use(express.static(root))
  return app.listen(port)
}
