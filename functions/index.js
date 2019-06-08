const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// noinspection JSUnusedLocalSymbols
const pj = (obj) => {
    return JSON.stringify(obj);
};

// noinspection JSUnusedLocalSymbols
const ppj = (obj) => {
    return JSON.stringify(obj, null, 2);
};

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

// GET studentEntrance
// @query uid (required) チャレキャラ参加学生のマスターUID
// @query year (required) チャレキャラ年度
exports.studentEntrance = functions.https.onRequest((request, response) => {
    const uid = request.query.uid;
    const year = request.query.year;

    if (!uid || !year) {
        response.status(400).end();
        return;
    }

    // state チェック用の乱数を得る
    const crypto = require('crypto');
    const stateRand = crypto.randomBytes(8).toString('hex');

    const state = JSON.stringify({
        token: stateRand, uid: uid, year: year
    });
    const encodedState = Buffer.from(state).toString('base64');

    response.redirect(
        `https://access.line.me/oauth2/v2.1/authorize` +
        `?response_type=code` +
        `&client_id=${functions.config().line_login.client_id}` +
        `&redirect_uri=${functions.config().line_login.redirect_uri}` +
        `&state=${encodedState}` +
        `&scope=openid%20profile%20email`);
});

exports.signInLine = functions.https.onRequest((request, response) => {
    // FIXME: Need a correct state.
    const dummyState = '12345abcde';

    response.redirect(
        `https://access.line.me/oauth2/v2.1/authorize` +
        `?response_type=code` +
        `&client_id=${functions.config().line_login.client_id}` +
        `&redirect_uri=${functions.config().line_login.redirect_uri}` +
        `&state=${dummyState}&scope=openid%20profile%20email`);
});

// @query code The authorization code from LINE Login.
// @query state
exports.signInLineCallback = functions.https.onCall(async (data) => {
    const {request} = require('gaxios');
    const res = await request({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        url: 'https://api.line.me/oauth2/v2.1/token',
        data: `grant_type=authorization_code` +
            `&code=${data.code}` +
            `&redirect_uri=${functions.config().line_login.redirect_uri}` +
            `&client_id=${functions.config().line_login.client_id}` +
            `&client_secret=${functions.config().line_login.channel_secret}`
    });

    console.log(pj(res));
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
