'use strict'

const clipboardy = require('clipboardy')
const { test, trait } = use('Test/Suite')('Main')
const Config = use('Config')
const Url = use('App/Models/Url')
const hashid = require('../../app/utils/hashid')

trait('Test/Browser')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Should show main page', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHas('TinyURL')
})

test('Should show cookie message', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHas('accept those cookies')
})

test('Should show custom 404-page if url not found in db', async ({
  browser,
}) => {
  const page = await browser.visit('/itsnotthere')
  await page.assertHas(
    '404\n\nWe are sorry to inform you that the requested url was not found.'
  )
})

test('Should be able to shorten an url, redirect back and show tinyfied url', async ({
  browser,
}) => {
  const page = await browser.visit('/')
  const testUrl = 'http://testurl.com'

  await page
    .type('[name="url"]', testUrl)
    .submitForm('form[action="/tinyfy"]')
    .waitForNavigation()
    .assertPath('/')
    .assertHas(testUrl)
})

test('User should see 10 latest urls', async ({ browser }) => {
  const page = await browser.visit('/')
  const urls = [
    'first.se',
    'second.se',
    'third.se',
    'fourth.se',
    'fifth.se',
    'sixth.se',
    'seventh.se',
    'eights.se',
    'ninth.se',
    'tenth.se',
    'eleventh.se',
  ]

  for (const url of urls) {
    await page
      .type('[name="url"]', url)
      .submitForm('form[action="/tinyfy"]')
      .waitForNavigation()
      .assertPath('/')
  }

  for (const url of urls.slice(1)) {
    await page.assertHas(url)
  }
})

test('User should be able to copy the shortened url to clipboard with copy button', async ({
  assert,
  browser,
}) => {
  const page = await browser.visit('/')
  const testUrl = 'https://testurl.com'

  await page
    .type('[name="url"]', testUrl)
    .submitForm('form[action="/tinyfy"]')
    .waitForNavigation()
    .click('button.copy-button')

  const tinyTestUrl = await page.getAttribute(
    'button.copy-button',
    'data-tiny-url'
  )

  assert.equal(clipboardy.readSync(), tinyTestUrl)
})

test('Should redirect when supplied tinyUrl', async ({ assert, client }) => {
  const appUrl = Config.get('app.appUrl')
  const url = new Url()
  url.full = appUrl
  await url.save()

  const hashed = hashid.encode(url.id)

  const response = await client.get(`/${hashed}`).end()

  assert.equal(response._res.redirects[0], `${appUrl}/`)
})
