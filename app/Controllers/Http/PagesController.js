'use strict'

class PagesController {
  index({ view }) {
    return view.render('index')
  }
}

module.exports = PagesController
