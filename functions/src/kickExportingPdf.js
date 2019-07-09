const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.https.onRequest((request, response) => {
  const apiKey = request.header('Api-Key')

  if (!apiKey) {
    response.status(400).end()
    return
  }
  if (apiKey !== functions.config().core.api_key) {
    response.status(401).end()
    return
  }

  response.send('Sent the request. Please wait several minutes.')
})
