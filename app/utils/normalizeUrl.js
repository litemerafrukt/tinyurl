'use strict'

function normalizeUrl(url) {
  if (url === null || url === undefined) {
    return null
  }

  const trimmed = url.trim()

  if (!trimmed.startsWith('http')) {
    return `http://${trimmed}`
  }

  return trimmed
}

module.exports = normalizeUrl
