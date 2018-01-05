const Path = require('path')
const defaults = require('lodash.defaultsdeep')

const _options = {
  routes: ['/'],
  capture: {
    delay: 3000
    // event: 'custom-document-event',
    // selector: ''
  }
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

    defaults(options, _options)
    return options
  }
}
