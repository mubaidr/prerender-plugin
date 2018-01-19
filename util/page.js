const FS = require('fs')
const Path = require('path')
const mkdirp = require('mkdirp')

function fixFormFields (page) {
  return page.evaluate(() => {
    Array.from(document.querySelectorAll('[type=radio]')).forEach(element => {
      if (element.checked) {
        element.setAttribute('checked', 'checked')
      } else {
        element.removeAttribute('checked')
      }
    })

    Array.from(document.querySelectorAll('[type=checkbox]')).forEach(
      element => {
        if (element.checked) {
          element.setAttribute('checked', 'checked')
        } else {
          element.removeAttribute('checked')
        }
      }
    )

    Array.from(document.querySelectorAll('option')).forEach(element => {
      if (element.selected) {
        element.setAttribute('selected', 'selected')
      } else {
        element.removeAttribute('selected')
      }
    })
  })
}

function fixInsertRule (page) {
  return page.evaluate(() => {
    Array.from(document.querySelectorAll('style')).forEach(style => {
      if (style.innerText === '') {
        // eslint-disable-next-line
        style.innerText = Array.from(style.sheet.rules)
          .map(rule => rule.cssText)
          .join('')
      }
    })
  })
}

async function blockResources (page) {
  await page.setRequestInterception(true)
  page.on('request', req => {
    if (
      // req.resourceType === 'stylesheet' ||
      req.resourceType === 'font' ||
      req.resourceType === 'image'
    ) {
      req.abort()
    } else {
      req.continue()
    }
  })
}

function addPrefetchLinks (page) {
  return page.evaluate(() => {
    function getHostname (url) {
      const a = document.createElement('a')
      a.href = url
      return a.hostname
    }

    function addPrefetch (url) {
      const hostname = getHostname(url)
      const isInternal =
        document.location.hostname === hostname || !hostname.length

      const link = document.createElement('link')
      link.href = url.replace('http://localhost:8000', '')
      link.setAttribute('rel', isInternal ? 'prefetch' : 'dns-prefetch')

      document.head.appendChild(link)
    }

    Array.from(document.querySelectorAll('a')).forEach(link => {
      addPrefetch(link.href)
    })

    Array.from(document.querySelectorAll('img')).forEach(img => {
      addPrefetch(img.src)
    })
  })
}

async function captureAndSave (page, route, options, callback) {
  const folder = Path.join(options.target, route)
  const file = Path.join(folder, 'index.html')

  if (options.status.success) return
  // eslint-disable-next-line
  options.status.success = true

  await fixFormFields(page)
  await fixInsertRule(page)
  await addPrefetchLinks(page)

  page
    .content()
    .then(async c => {
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
      window.onCustomEvent({
        type,
        detail: e.detail
      })
    })
  }, event)
}

function findSelector (page, options, callback) {
  const retries = 20
  let tries = 0

  const check = setInterval(() => {
    if (tries < retries) {
      page.$(options.capture.selector).then(sel => {
        if (sel) {
          clearInterval(check)
          callback()
        }
      })

      tries += 1
    } else {
      clearInterval(check)
    }
  }, options.capture.delay / retries)
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
      }

      await page.goto(url, {
        waitUntil: 'networkidle0'
      })

      setTimeout(() => {
        captureAndSave(page, route, options, callback)
      }, options.capture.delay)

      if (options.capture.selector) {
        findSelector(page, options, () => {
          captureAndSave(page, route, options, callback)
        })
      }
    } catch (err) {
      throw err
    }
  }
}
