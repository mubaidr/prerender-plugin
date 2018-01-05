const FS = require('fs')
const Path = require('path')
const mkdirp = require('mkdirp')

module.exports = {
  process: async(route, options, callback) => {
    const folder = Path.join(options.target, route)
    const file = Path.join(folder, 'index.html')
    const url = `${options.url}${route}`

    try {
      const page = await options.browser.newPage()
      await page.goto(url)
      const content = await page.content()
      await page.close()

      mkdirp(folder, () => {
        FS.writeFileSync(file, content)
      })
    } catch (err) {
      callback(err)
    }

    callback()
  }
}
