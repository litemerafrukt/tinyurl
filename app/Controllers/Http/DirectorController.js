'use strict'

const Url = use('App/Models/Url')
const { validate } = use('Validator')
const hashid = require('../../utils/hashid')

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
    const validation = await validate(request.all(), {
      url: 'required|min:3',
    })

    if (validation.fails()) {
      session.withErrors(validation.messages()).flashAll()

      return response.redirect('back')
    }

    const url = new Url()
    url.full = request.input('url')
    await url.save()

    const hashedId = hashid.encode(url.id)

    const tinyurls = session.get('tinyurls', [])
    tinyurls.unshift({ hash: hashedId, url: url.full })
    tinyurls.splice(10, 1000)
    session.put('tinyurls', tinyurls)

    session.flash({ notification: 'Saved!' })

    return response.redirect('back')
  }
}

module.exports = DirectorController
