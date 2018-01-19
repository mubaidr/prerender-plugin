const defaults = require('lodash.defaultsdeep')

const _options = {
  routes: ['/'],
  capture: {},
  status: {
    success: false
  }
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

    defaults(options, _options)

    if (!options.capture.delay) {
      if (options.capture.event || options.capture.selector) {
        options.capture.delay = 5000
      } else {
        options.capture.delay = 1000
      }
    }

    return options
  }
}
