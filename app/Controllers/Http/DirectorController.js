'use strict'

const Url = use('App/Models/Url')
const hashid = require('../../utils/hashid')
const normalizeUrl = require('../../utils/normalizeUrl')
const validateUrl = require('../../utils/validateUrl')

class DirectorController {
  async direct({ params, response }) {
    try {
      const id = hashid.decode(params.tinyurl)
      const url = await Url.findOrFail(id)
      return response.redirect(url.full, false, 301)
    } catch (_) {
      return response.status(404).send('404')
    }
  }

  async store({ request, response, session }) {
    const normalizedUrl = normalizeUrl(request.input('url'))
    const validation = await validateUrl(normalizedUrl)

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()

      return response.redirect('back')
    }

    const url = new Url()
    url.full = normalizedUrl
    await url.save()

    const hashedId = hashid.encode(url.id)
    const tinyUrls = session.get('tinyurls', [])
    tinyUrls.unshift({ hash: hashedId, url: url.full })
    tinyUrls.splice(10, 1000)
    session.put('tinyurls', tinyUrls)

    session.flash({ notification: 'Tinyfied!' })

    return response.redirect('back')
  }
}

module.exports = DirectorController
