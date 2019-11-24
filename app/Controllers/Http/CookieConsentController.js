'use strict'

class CookieConsentController {
  ok({ response, session }) {
    session.put('cookieconsent', true)
    return response.redirect('back')
  }
}

module.exports = CookieConsentController
