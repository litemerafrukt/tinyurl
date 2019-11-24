'use strict'

const Config = use('Config')

const appUrl = Config.get('app.appUrl')

class PagesController {
  index({ view, session }) {
    const tinyUrls = session.get('tinyurls', [])
    const cookieConsent = session.get('cookieconsent', false)
    return view.render('index', { tinyUrls, cookieConsent, appUrl })
  }
}

module.exports = PagesController
