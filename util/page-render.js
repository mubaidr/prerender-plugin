/* eslint-disable */
const defaultsDeep = require('lodash.defaultsDeep')
const system = require('system')
const page = require('webpage').create()
/* eslint-enable */

const url = system.args[1]
const options = JSON.parse(system.args[2])

function returnResult (html) {
  console.log(html.trim())
  phantom.exit()
}

returnResult(' phantom please ')

/*
page.settings.loadImages = false
page.settings.localToRemoteUrlAccessEnabled = true
page.settings.resourceTimeout = 15000

if (options.navigationLocked) {
  page.onLoadStarted = () => {
    page.navigationLocked = true
  }
}

if (options.phantomPageSettings) {
  page.settings = defaultsDeep(options.phantomPageSettings, page.settings)
}

if (options.phantomPageViewportSize) {
  page.viewportSize = options.phantomPageViewportSize
}

page.onInitialized = () => {
  page.injectJs(`${page.libraryPath}/../../core-js/client/core.js`)
}

page.onResourceRequested = (requestData, request) => {
  if (/\.css$/i.test(requestData.url)) request.abort()
}

page.onError = message => {
  if (options.ignoreJSErrors) return
  console.error(`WARNING: JavaScript error: ${url}\n${message}`)
  phantom.exit(1)
}

page.open(url, status => {
  console.log(status)

  returnResult(status)
})

/*
page.open(url, status => {
  if (status !== 'success') {
    throw new Error(`FAIL to load: ${url}`)
  } else {
    // CAPTURE WHEN AN EVENT FIRES ON THE DOCUMENT
    if (options.captureAfterDocumentEvent) {
      page.onCallback = returnResult
      page.evaluate(eventName => {
        document.addEventListener(eventName, () => {
          const doctype = new window.XMLSerializer().serializeToString(
            document.doctype
          )
          const { outerHTML } = document.documentElement
          window.callPhantom(doctype + outerHTML)
        })
      }, options.captureAfterDocumentEvent)
    }

    // CAPTURE ONCE A SPECIFC ELEMENT EXISTS
    if (options.captureAfterElementExists) {
      const intervalId = setInterval(() => {
        const html = page.evaluate(elementSelector => {
          if (document.querySelector(elementSelector)) {
            const doctype = new window.XMLSerializer().serializeToString(
              document.doctype
            )
            const { outerHTML } = document.documentElement
            return doctype + outerHTML
          }
          return false
        }, options.captureAfterElementExists)

        if (html) {
          clearInterval(intervalId)
          returnResult(html)
        }
      }, 250)
    }

    // CAPTURE AFTER A NUMBER OF MILLISECONDS
    if (options.captureAfterTime) {
      setTimeout(() => {
        const html = page.evaluate(() => {
          const doctype = new window.XMLSerializer().serializeToString(
            document.doctype
          )
          const { outerHTML } = document.documentElement
          return doctype + outerHTML
        })
        returnResult(html)
      }, options.captureAfterTime)
    }

    // IF NO SPECIFIC CAPTURE HOOK IS SET, CAPTURE
    // IMMEDIATELY AFTER SCRIPTS EXECUTE
    if (
      !options.captureAfterDocumentEvent &&
      !options.captureAfterElementExists &&
      !options.captureAfterTime
    ) {
      const html = page.evaluate(() => {
        const doctype = new window.XMLSerializer().serializeToString(
          document.doctype
        )
        const { outerHTML } = document.documentElement
        return doctype + outerHTML
      })
      returnResult(html)
    }
  }
})
*/
