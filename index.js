/**
 * Module Dependencies
 */

var accessorize = require('accessorize')
var assign = require('object-assign')
var parse = require('url').parse

/**
 * Export `x-cookie`
 */

module.exports = crosscookies

/**
 * Production
 */

var production = 'production' === process.env.NODE_ENV

/**
 * Initialize a cross-domain cookie
 *
 * @param {Object} options
 * @return {Generator}
 */

function crosscookies(options) {
  options = options || {}

  return function *_cross_cookies (next) {
    // set the default based on if the keygrip is set or not.
    options.sign = options.sign === undefined
      ? this.app.keys && this.app.keys.length
      : !!options.sign

    // add the cross cookie accessor
    this.crosscookies = accessorize()

    // continue down to the rest of the middleware...
    yield next
    // ... and on the way back up...

    var cookies = this.crosscookies()
    for (var cookie in cookies) {
      this.cookies.set(cookie, cookies[cookie], assign({
        domain: production ? domain(this.host) : false,
      }, options))
    }
  }
}

/**
 * Get a domain
 *
 * @param {String} url
 * @return {String}
 */

function domain (host) {
  return host
    .split('.')
    .slice(-2)
    .join('.')
}
