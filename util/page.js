const FS = require('fs')
const Path = require('path')
const mkdirp = require('mkdirp')

async function blockResources (page) {
  await page.setRequestInterception(true)
  page.on('request', req => {
    if (
      req.resourceType === 'stylesheet' ||
      req.resourceType === 'font' ||
      req.resourceType === 'image'
    ) {
      req.abort()
    } else {
      req.continue()
    }
  })
}

function captureAndSave (page, route, options, callback) {
  const folder = Path.join(options.target, route)
  const file = Path.join(folder, 'index.html')

  page
    .content()
    .then(c => {
      let content = c
      if (options.postProcess) {
        content = options.postProcess(content)
      }

      mkdirp(folder, () => {
        FS.writeFileSync(file, content)
      })

      page
        .close()
        .catch(callback)
        .then(callback)
    })
    .catch(err => {
      callback(err)
    })
}

function addCustomListner (page, event) {
  return page.evaluateOnNewDocument(type => {
    document.addEventListener(type, e => {
      window.onCustomEvent({ type, detail: e.detail })
    })
  }, event)
}

function findSelector (page, selector, callback) {
  const retries = 10
  let tries = 0

  const check = setInterval(() => {
    if (tries < retries) {
      page.$(selector).then(sel => {
        if (sel) {
          clearInterval(check)
          callback()
        }
      })

      tries += 1
    } else {
      clearInterval(check)
      throw new Error('Cannot find the specified selector in page.')
    }
  }, 250)
}

module.exports = {
  process: async(route, options, callback) => {
    const url = `${options.url}${route}`

    try {
      const page = await options.browser.newPage()
      await blockResources(page)

      if (options.capture.event) {
        await page.exposeFunction(options.capture.event, () => {
          captureAndSave(page, route, options, callback)
        })
        await addCustomListner(page, options.capture.event)
        await page.goto(url, { waitUntil: ['load ', 'networkidle0'] })
      } else {
        await page.goto(url, { waitUntil: ['load ', 'networkidle0'] })

        if (options.capture.delay) {
          setTimeout(() => {
            captureAndSave(page, route, options, callback)
          }, options.capture.delay)
        } else if (options.capture.selector) {
          findSelector(page, options.capture.selector, () => {
            captureAndSave(page, route, options, callback)
          })
        }
      }
    } catch (err) {
      throw err
    }
  }
}
