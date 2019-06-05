const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onCall((data, context) => {
    return {message: "addMessage"};
});
