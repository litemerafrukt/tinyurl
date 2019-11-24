'use strict'

const Config = use('Config')

const appUrl = Config.get('app.appUrl')

class PagesController {
  index({ view, session }) {
    const tinyurls = session.get('tinyurls', [])
    return view.render('index', { tinyurls, appUrl })
  }
}

module.exports = PagesController
