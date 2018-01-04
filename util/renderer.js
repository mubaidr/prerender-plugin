const FS = require('fs')
const Path = require('path')
const mkdirp = require('mkdirp')
const puppeteer = require('puppeteer')

function save (rootPath, route, html) {
  const folder = Path.join(rootPath, route)
  const file = Path.join(folder, 'index.html')

  mkdirp.sync(folder)
  FS.writeFile(file, html)
}

module.exports = {
  render: async(port, route, options, callback) => {
    const uri = `http://localhost:${port}${route}`

    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(uri)
      const content = await page.content()
      save(options.outputDir, route, content)
      await browser.close()
      callback(false)
    } catch (err) {
      callback(err)
    }
  }
}
