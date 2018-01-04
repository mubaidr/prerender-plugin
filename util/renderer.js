const FS = require('fs')
const Path = require('path')
const mkdirp = require('mkdirp')
const puppeteer = require('puppeteer')

async function save (html, route) {
  const folder = Path.join(this.options.outputDir, route)
  const file = Path.join(folder, 'index.html')

  mkdirp.sync(folder)
  FS.writeFile(file, html)
}

module.exports = {
  render: async(port, route, options, callback) => {
    const uri = `http://localhost:${port}${route}`

    console.log(options)

    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(uri)

      save('--- something ---', route)

      await browser.close()
      callback()
    } catch (err) {
      callback(err)
    }
  }
}
