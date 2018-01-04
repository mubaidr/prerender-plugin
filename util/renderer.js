const FS = require('fs')
const Path = require('path')
const mkdirp = require('mkdirp')
const puppeteer = require('puppeteer')

async function capture (page, callback) {
  const content = await page.content()
  callback(content)
}

function save (rootPath, route, html) {
  const folder = Path.join(rootPath, route)
  const file = Path.join(folder, 'index.html')

  mkdirp.sync(folder)
  FS.writeFile(file, html)
}

module.exports = {
  render: async(route, options, callback) => {
    const uri = `http://localhost:${options.address.port}${route}`

    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(uri)

      capture(page, async content => {
        save(options.target, route, content)
        await browser.close()
        callback(false)
      })
    } catch (err) {
      callback(err)
    }
  }
}
