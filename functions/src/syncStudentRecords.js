const functions = require('firebase-functions')
const admin = require('firebase-admin')

const { google } = require('googleapis')
const { auth } = require('google-auth-library')
const sheets = google.sheets('v4')

// GET syncStudentRecords
// Student Record スプレッドシートからデータを取得し、Firestore に反映する
// @header 'Api-Key:' (required)
module.exports = functions.https.onRequest(async (request, response) => {
  const apiKey = request.header('Api-Key')

  if (!apiKey) {
    response.status(400).end()
    return
  }
  if (apiKey !== functions.config().core.api_key) {
    response.status(401).end()
    return
  }

  const client = await auth.getClient({
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  })

  const res = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId: functions.config().student_record.spreadsheet_id,
    range: 'School!A2:A30'
  })

  let ranges = []
  for (let i = 0; i < res.data.values.length; i++) {
    const line = 2 + i
    ranges.push(`School!A${line}:C${line}`)
  }

  const batchGetRes = await sheets.spreadsheets.values.batchGet({
    auth: client,
    spreadsheetId: functions.config().student_record.spreadsheet_id,
    ranges: ranges
  })

  const schools = admin.firestore().collection('schools')

  if (batchGetRes.data.valueRanges) {
    for (let i = 0; i < batchGetRes.data.valueRanges.length; i++) {
      const values = batchGetRes.data.valueRanges[i].values[0]
      const uid = values[0]
      const name = values[1]
      const phoneticName = values[2]

      if (uid && name && phoneticName) {
        // eslint-disable-next-line no-await-in-loop
        await schools.doc(uid).set({
          name: name,
          phoneticName: phoneticName
        })
      }
    }
  }

  // 学生データの同期
  const studentRes = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId: functions.config().student_record.spreadsheet_id,
    range: '2019!A2:A200'
  })
  let studentRanges = []
  for (let i = 0; i < studentRes.data.values.length; i++) {
    const line = 2 + i
    studentRanges.push(`2019!A${line}:H${line}`)
  }
  const studentBatchGetRes = await sheets.spreadsheets.values.batchGet({
    auth: client,
    spreadsheetId: functions.config().student_record.spreadsheet_id,
    ranges: studentRanges
  })

  const students = admin.firestore().collection('students')

  if (studentBatchGetRes.data.valueRanges) {
    for (let i = 0; i < studentBatchGetRes.data.valueRanges.length; i++) {
      const values = studentBatchGetRes.data.valueRanges[i].values[0]
      const uid = values[0]
      const school = values[1]
      const sei = values[2]
      const mei = values[3]
      const phoneticSei = values[4]
      const phoneticMei = values[5]
      const email = values[6]
      const phone = values[7]

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
        })
      }
    }
  }

  response.status(204).end()
})
