# TinyURL

This is a url shortener web-app built with AdonisJS.

## Setup

- clone repo
- cd in to `tinyurl` and run `npm i`
- `npm run create:env` to get a basic .env file
- `npm run migrate` to create the db
- `npm run start` to start the web app
- the app will be served on [localhost:1337](localhost:1337)

To run in development mode with auto-reload I recommend to install the adonis command globally with `npm i -g @adonisjs/cli`. Then you can run `adonis serve --dev` to start the app in development. Alternatively you can start with `npm run start:dev` that uses npx.

### Note about .env

The APP_KEY in the .env file is there to get you upp to speed in the dev environment, to generate a new key run `npm run create:key` or `adonis key:generate` if you have adonis-cli installed.

SHORT_URL_SEED is used to calculate a hash from a database id
and SHORT_URL_ALPHABET is the characters used in the hash.

## Run tests

After setup you can run the tests with `npm run test`.

## Develop

If you want to keep develop from this repo I recommend checking out [Adonis documentation](https://adonisjs.com/) and to install adonis-cli globally (to easily refresh migrations and such)

## License

MIT
