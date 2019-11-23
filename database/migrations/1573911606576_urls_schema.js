"use strict"

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema")

class UrlsSchema extends Schema {
  up() {
    this.create("urls", table => {
      table.increments()
      table.text("full")
      table.timestamps()
    })
  }

  down() {
    this.drop("urls")
  }
}

module.exports = UrlsSchema
