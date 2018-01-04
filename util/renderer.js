const Path = require('path')
const phantomjs = require('phantomjs-prebuilt')

module.exports = {
  render: async(staticDir, url, options, callback) => {
    const params = [url, JSON.stringify(options)]

    const program = await phantomjs.exec(
      Path.join(__dirname, 'page-render.js'),
      ...params
    )
    program.stderr.pipe(process.stderr)

    program.stdout.on('data', buffer => {
      callback(buffer.toString())
    })
  }
}
