const functions = require('firebase-functions')
const admin = require('firebase-admin')

module.exports = functions.pubsub.topic('export-pdf').onPublish(message => {
  console.log('Called by pub/sub')
})
