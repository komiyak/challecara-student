const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const {google} = require('googleapis');
const {auth} = require('google-auth-library');
const sheets = google.sheets('v4');

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

// GET syncStudentRecords
// Student Record スプレッドシートからデータを取得し、Firestore に反映する
// @header 'Api-Key:' (required)
exports.syncStudentRecords = functions.https.onRequest(async (request, response) => {
    const apiKey = request.header('Api-Key');

    if (!apiKey) {
        response.status(400).end();
        return;
    }
    if (apiKey !== functions.config().core.api_key) {
        response.status(401).end();
        return;
    }

    const client = await auth.getClient({
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    const res = await sheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId: functions.config().student_record.spreadsheet_id,
        range: 'School!A2:A30'
    });

    let ranges = [];
    for (let i = 0; i < res.data.values.length; i++) {
        const line = 2 + i;
        ranges.push(`School!A${line}:C${line}`);
    }

    const batchGetRes = await sheets.spreadsheets.values.batchGet({
        auth: client,
        spreadsheetId: functions.config().student_record.spreadsheet_id,
        ranges: ranges
    });

    const schools = admin.firestore().collection('schools');

    if (batchGetRes.data.valueRanges) {
        for (let i = 0; i < batchGetRes.data.valueRanges.length; i++) {
            const values = batchGetRes.data.valueRanges[i].values[0];
            const uid = values[0];
            const name = values[1];
            const phoneticName = values[2];

            if (uid && name && phoneticName) {
                // eslint-disable-next-line no-await-in-loop
                await schools.doc(uid).set({
                    name: name,
                    phoneticName: phoneticName
                });
            }
        }
    }

    // 学生データの同期
    const studentRes = await sheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId: functions.config().student_record.spreadsheet_id,
        range: '2019!A2:A200'
    });
    let studentRanges = [];
    for (let i = 0; i < studentRes.data.values.length; i++) {
        const line = 2 + i;
        studentRanges.push(`2019!A${line}:H${line}`);
    }
    const studentBatchGetRes = await sheets.spreadsheets.values.batchGet({
        auth: client,
        spreadsheetId: functions.config().student_record.spreadsheet_id,
        ranges: studentRanges
    });

    const students = admin.firestore().collection('students');

    if (studentBatchGetRes.data.valueRanges) {
        for (let i = 0; i < studentBatchGetRes.data.valueRanges.length; i++) {
            const values = studentBatchGetRes.data.valueRanges[i].values[0];
            const uid = values[0];
            const school = values[1];
            const sei = values[2];
            const mei = values[3];
            const phoneticSei = values[4];
            const phoneticMei = values[5];
            const email = values[6];
            const phone = values[7];

            if (uid && school && sei && mei && phoneticSei && phoneticMei) {
                // eslint-disable-next-line no-await-in-loop
                await students.doc(uid).set({
                    school: school,
                    year: '2019',
                    sei: sei,
                    mei: mei,
                    phoneticSei: phoneticSei,
                    phoneticMei: phoneticMei,
                    email: email,
                    phone: phone
                });
            }
        }
    }

    response.status(204).end();
});

// LINE Login 認証連携時のコールバック
// @data code (required) The authorization code from LINE Login.
// @data state (required) 学生情報を含む state 値
exports.lineCallback = functions.https.onRequest(async (request, response) => {
    const code = request.query.code;
    const state = request.query.state;
    if (!code || !state) {
        throw new functions.https.HttpsError('missing-argument');
    }

    // FIXME: state は JWT にしなければ、改ざんの可能性がある
    const decodedState = JSON.parse(new Buffer(state, 'base64').toString('ascii'));

    const gaxios = require('gaxios');
    const res = await gaxios.request({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        method: 'POST',
        url: 'https://api.line.me/oauth2/v2.1/token',
        data: `grant_type=authorization_code` +
            `&code=${code}` +
            `&redirect_uri=${functions.config().line_login.redirect_uri}` +
            `&client_id=${functions.config().line_login.client_id}` +
            `&client_secret=${functions.config().line_login.channel_secret}`
    });

    let user_id = null;

    if (res.data.id_token) {
        const jwt = require('jsonwebtoken');
        try {
            const decoded = jwt.verify(res.data.id_token, functions.config().line_login.channel_secret);

            const doc = admin.firestore().collection('users').doc(decoded.sub);
            await doc.set({
                studentUid: decodedState.uid,
                email: decoded.email,
                emailVerified: true,
                avatorUrl: decoded.picture
            });

            user_id = decoded.sub;
        } catch (e) {
            console.error(e);
        }
    }

    // Authentication with Firebase.
    if (user_id) {
        await admin.auth().createCustomToken(user_id).then((customToken) => {
            console.log('Generated custom token: ', customToken);
            return true;
        }).catch((err) => {
            console.error(err);
        });
    }

    response.send('success o auth.');
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
