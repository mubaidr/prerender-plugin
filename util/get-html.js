const Path = require('path')
const childProcess = require('child_process')
const phantomjs = require('phantomjs-prebuilt')

module.exports = (staticDir, url, options) => {
  const phantomArguments = [
    Path.join(__dirname, 'page-render.js'),
    url,
    JSON.stringify(options)
  ]

  if (options.phantomOptions) {
    phantomArguments.unshift(options.phantomOptions)
  }

  return childProcess.execFileSync(phantomjs.path, phantomArguments).toString()
}
