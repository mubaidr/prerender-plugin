const puppeteer = require('puppeteer')

module.exports = {
  build: async() => {
    try {
      return await puppeteer.launch()
    } catch (err) {
      throw err
    }
  }
}
