'use strict'

const Config = use('Config')
const Hashids = require('hashids/cjs')

const appSecret = Config.get('app.appSecret')
const shortUrlAlphabet = Config.get('app.shortUrlAlphabet')

class HashId {
  constructor() {
    this.hashids = new Hashids(appSecret, 6, shortUrlAlphabet)
  }

  encode(id) {
    return this.hashids.encode(id)
  }

  decode(hash) {
    const id = this.hashids.decode(hash)[0]

    if (id === undefined) {
      throw new Error('Invalid hash')
    }

    return id
  }
}

module.exports = new HashId()
