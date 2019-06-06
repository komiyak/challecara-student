const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onCall((data, context) => {
    if (context.auth) {
        const uid = context.auth.uid;
        const name = context.auth.token.name || null;
        const picture = context.auth.token.picture || null;
        const email = context.auth.token.email || null;

        console.log(`uid: ${uid}, name: ${name}, picture: ${picture}, email: ${email}`);
    } else {
        console.log('non authorized user.');
    }

    return {message: "addMessage"};
});
