'use strict'

const { test } = use('Test/Suite')('Normalize Url')

const normalizeUrl = require('../../app/utils/normalizeUrl')

test('Undefined or null url should be null', ({ assert }) => {
  assert.equal(normalizeUrl(), null)
  assert.equal(normalizeUrl(null), null)
})

test('Make sure the url starts with http unless https', ({ assert }) => {
  const hasHttps = 'https://github.com'
  const hasHttp = 'http://github.com'
  const doesNotHaveHttp = 'github.com'

  assert.equal(normalizeUrl(hasHttps), hasHttps)
  assert.equal(normalizeUrl(hasHttp), hasHttp)
  assert.equal(normalizeUrl(doesNotHaveHttp), 'http://github.com')
})

test('url should be trimmed from white-space', ({ assert }) => {
  const expected = 'http://github.com'

  assert.equal(normalizeUrl('    http://github.com  '), expected)
  assert.equal(normalizeUrl('\nhttp://github.com\n'), expected)
  assert.equal(normalizeUrl('\thttp://github.com\t'), expected)
})
