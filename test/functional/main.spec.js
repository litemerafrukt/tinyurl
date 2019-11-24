'use strict'

const { test, trait } = use('Test/Suite')('Main')

trait('Test/Browser')

test('Should show main page', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHas('TinyURL')
})

test('Should be able to shorten an url, redirect back and show tinyfied url', async ({
  browser,
}) => {
  const testUrl = 'http://testurl.com'
  const page = await browser.visit('/')

  await page
    .type('[name="url"]', testUrl)
    .submitForm('form')
    .waitForNavigation()
    .assertPath('/')
    .assertHas(testUrl)
})
