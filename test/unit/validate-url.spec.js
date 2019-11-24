'use strict'

const { test } = use('Test/Suite')('Validate Url')

const validateUrl = require('../../app/utils/validateUrl')

test('Url is required', async ({ assert }) => {
  const validation = await validateUrl(null)

  assert.isTrue(validation.fails())
})

test('Url scheme is http or https', async ({ assert }) => {
  const validHttpValidation = await validateUrl('http://github.com')
  const validHttpsValidation = await validateUrl('https://github.com')

  assert.isFalse(validHttpValidation.fails())
  assert.isFalse(validHttpsValidation.fails())
})

test('javascript and data schemes is not valid', async ({ assert }) => {
  const inValidJavascriptValidation = await validateUrl(
    'javascript:alert("xss");'
  )
  const inValidDataValidation = await validateUrl(
    'data:base64encodedfunkystuff'
  )

  assert.isTrue(inValidJavascriptValidation.fails())
  assert.isTrue(inValidDataValidation.fails())
})
