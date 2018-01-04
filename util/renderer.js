const Path = require('path')
// const childProcess = require('child_process')
const phantomjs = require('phantomjs-prebuilt')

module.exports = {
  render: async(staticDir, url, options, callback) => {
    const params = [url, JSON.stringify(options)]

    const program = await phantomjs.exec(
      // '--debug=true',
      Path.join(__dirname, 'page-render.js'),
      ...params
    )
    program.stderr.pipe(process.stderr)

    program.stdout.on('data', buffer => {
      callback(buffer.toString())
    })

    /*
    const phantomArguments = [
      Path.join(__dirname, 'page-render.js'),
      url,
      JSON.stringify(options)
    ]

    if (options.phantomOptions) {
      phantomArguments.unshift(options.phantomOptions)
    }

    return childProcess
      .execFileSync(phantomjs.path, phantomArguments)
      .toString()
      */
  }
}
