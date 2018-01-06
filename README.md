# prerender-plugin

[![NPM](https://nodei.co/npm/prerender-plugin.png?compact=true)](https://nodei.co/npm/prerender-plugin/)

A Node.js/webpack plugin to prerender static HTML in a single-page application.

## What is Prerendering?

Prerendering is a process to preload all elements on the page in preparation for a web crawler to see it. If you’re using a Single Page Application (SPA) for a site that’s not behind a login and SEO is an important concern then this plugin could help you easily generate pre-rendered version of your application.

## Install

```js
npm install prerender-plugin
```

## Usage

This package can be used either directly with Node.js or with webpack build process.

### Node.js

```js
var PrerenderPlugin = require('prerender-plugin')

new PrerenderPlugin(options).apply()
```

### Webpack

```js
// webpack.config.js or webpack.prod.conf.js
var PrerenderPlugin = require('prerender-plugin')

module.exports = {
  // ...
  plugins: [new PrerenderPlugin(options)]
}
```

## Options

```js
{
  // Website source
  // *required
  source: "",
  // target folder for prendered content.
  // default: source
  target: "",
  // list of routes to pre-render
  // default: ["/"]
  routes: [],
  // specify capture technique
  // default: capture: {delay: 1000}
  capture: {
    // delay before prerendering content
    delay: 2500,
    // trigger prerendering on custom document
    // you need to raise event in your website
    event: "custom-document-event",
    // wait for selector before prerendering
    selector: ""
  },
  // post processing function
  postProcess: html => {
    return html
  }
}
```

## Examples

Plese check the `examples` folder in the root directory for both Node.js and Webpack usage.

Development of this plugin is inspired by [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)
