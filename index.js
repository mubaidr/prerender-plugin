const serverBuilder = require('./util/server')
const browserBuilder = require('./util/browser')
const pageProcessor = require('./util/page')
const optionsProcessor = require('./util/options')

function HtmlPrerenderer (options) {
  this.options = optionsProcessor.process(options)
}

// eslint-disable-next-line
HtmlPrerenderer.prototype.apply = async function() {
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
    })
}

// Debug code start
new HtmlPrerenderer({
  source: '../gh-pages/dist',
  routes: ['/']
}).apply()
// Debug code end
