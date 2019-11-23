'use strict'

const { test } = use('Test/Suite')('hashid')

const hashid = require('../../app/utils/hashid')

test('should encode id to string of length 6', ({ assert }) => {
  const hash = hashid.encode(1)

  assert.equal(hash.length, 6)
})

test('should be able to encode and then decode to same id', ({ assert }) => {
  const id = 1
  const hash = hashid.encode(id)
  const decoded = hashid.decode(hash)

  assert.equal(decoded, id)
})

test('should encode two different ids to different hashes', ({ assert }) => {
  const hash1 = hashid.encode(1)
  const hash2 = hashid.encode(2)

  assert.notEqual(hash1, hash2)
})

test('should throw on failing to decode', ({ assert }) => {
  assert.throws(() => hashid.decode(''), 'Invalid hash')
})
