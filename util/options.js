const defaults = require('lodash.defaultsdeep')

const _options = {
  routes: ['/']
}

module.exports = {
  process: (obj = {}) => {
    const options = obj

    if (!options.source) {
      throw new Error('Source directory not provided. ')
    }

    if (!options.target) {
      options.target = options.source
    }

    if (!options.capture || Object.keys(options.capture).length === 0) {
      options.capture = {
        delay: 1000
      }
    }

    defaults(options, _options)
    return options
  }
}
