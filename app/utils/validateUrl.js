'use strict'

const { validate } = use('Validator')

async function validateUrl(url) {
  return await validate(
    { url },
    { url: 'required|url' },
    {
      'url.required': 'There does not seem to be any url to shorten.',
      'url.url': 'Please check your url and try again.',
    }
  )
}

module.exports = validateUrl
