# prerender-plugin

[![NPM](https://nodei.co/npm/prerender-plugin.png?compact=true)](https://nodei.co/npm/prerender-plugin/)

Node.js/webpack module/plugin to prerender static HTML in a single-page application.

## What is Prerendering?

Prerendering is a process to preload all elements on the page in preparation for a web crawler to see it. If you’re using a Single Page Application (SPA) for a site that’s not behind a login and SEO is an important concern then this plugin could help you easily generate pre-rendered version of your application.

## Installation

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
  plugins: [
    // ...
    new PrerenderPlugin(options)
  ]
}
```

## Options

| Option           | Type                      | Required | Default | Description                                                                                                                                                            |
| ---------------- | ------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| source           | String                    | Yes      |         | Path of the web application.                                                                                                                                           |
| target           | String                    |          | source  | Path to save generated content.                                                                                                                                        |
| routes           | Array of Strings          |          | ['/']   | Routes which will be pre-rendered.                                                                                                                                     |
| capture.delay    | Integer                   |          | 1000ms  | Time to wait before page capture.                                                                                                                                      |
| capture.event    | String                    |          |         | Custom event for page capture.                                                                                                                                         |
| capture.selector | String                    |          |         | Wait until selected selector is available in the page before page capture.                                                                                             |
| postProcess      | Function (content, route) |          |         | A function to process the generated HTML content. This function must return the final processed content. `Content` & `route` are the only parameters for this function |

### Notes:

* If two or more capture optons are provided, page capture will occur on the earliest of the provided options.
* If `capture.event` or `capture.selector` option is being used then `capture.delay` will act as timeout (default 10s).

## Examples

Plese check the `examples` folder in the root directory for both Node.js and Webpack usage.

Development of this plugin is inspired by [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)
