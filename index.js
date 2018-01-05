const serverBuilder = require('./util/server')
const browserBuilder = require('./util/browser')
const pageProcessor = require('./util/page')
const optionsProcessor = require('./util/options')

function HtmlPrerenderer (options) {
  this.options = optionsProcessor.process(options)
}

async function process (compilation, done) {
  this.options.server = await serverBuilder.build(this.options.source)
  this.options.browser = await browserBuilder.build()
  this.options.url = `http://localhost:${this.options.server.address().port}`

  Promise.all(
    this.options.routes.map(
      route =>
        new Promise(async(resolve, reject) => {
          pageProcessor.process(route, this.options, err => {
            if (err) reject(err)

            resolve()
          })
        })
    )
  )
    .catch(err => {
      setTimeout(() => {
        console.log(err)
        throw err
      }, 0)
    })
    .then(() => {
      this.options.browser.close()
      this.options.server.close()

      if (done) done()
    })
}

// eslint-disable-next-line
HtmlPrerenderer.prototype.apply = async function(compiler) {
  if (compiler) {
    compiler.plugin('after-emit', process.bind(this))
  } else {
    process().bind(this)
  }
}

module.exports = HtmlPrerenderer
