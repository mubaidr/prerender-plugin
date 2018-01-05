const Path = require('path')
const defaults = require('lodash.defaultsdeep')

const _options = {
  routes: ['/']
}

module.exports = {
  process: obj => {
    const options = obj || {}

    if (!options.source) {
      throw new Error('Source directory not provided. ')
    }

    if (!options.target) {
      options.target = Path.join(options.source, '../', 'dist-pre-rendered')
    }

    if (options.capture && Object.keys(options.capture).length === 0) {
      options.capture = {
        delay: 2500
      }
    }

    defaults(options, _options)
    return options
  }
}
