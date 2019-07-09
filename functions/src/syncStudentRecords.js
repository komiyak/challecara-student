const functions = require('firebase-functions')
const admin = require('firebase-admin')

const { google } = require('googleapis')
const { auth } = require('google-auth-library')
const sheets = google.sheets('v4')

const utils = require('./utils')

const batchGet = async (authClient, sheetName, line, endRow) => {
  const res = await sheets.spreadsheets.values.get({
    auth: authClient,
    spreadsheetId: functions.config().student_record.spreadsheet_id,
    range: `${sheetName}!A2:A${line}`
  })

  let ranges = []
  for (let i = 0; i < res.data.values.length; i++) {
    const currentLine = 2 + i
    ranges.push(`${sheetName}!A${currentLine}:${endRow}${currentLine}`)
  }

  return await sheets.spreadsheets.values.batchGet({
    auth: authClient,
    spreadsheetId: functions.config().student_record.spreadsheet_id,
    ranges: ranges
  })
}

/**
 * Fetch school records from the spreadsheet.
 * @param authClient
 * @param line 取得する行数
 * @returns {Promise<Array>}
 */
const fetchSchoolRecords = async (authClient, line) => {
  const batchGetRes = await batchGet(authClient, 'School', line, 'C')

  let result = []
  if (batchGetRes.data.valueRanges) {
    for (let i = 0; i < batchGetRes.data.valueRanges.length; i++) {
      const values = batchGetRes.data.valueRanges[i].values[0]
      const uid = values[0]
      const name = values[1]
      const phoneticName = values[2]

      if (uid && name && phoneticName) {
        result.push({
          documentId: uid,
          name,
          phoneticName
        })
      }
    }
  }
  return result
}

/**
 * Fetch location records from the spreadsheet.
 * @param authClient
 * @param line
 * @returns {Promise<Array>}
 */
const fetchLocationRecords = async (authClient, line) => {
  const batchGetRes = await batchGet(authClient, 'Location', line, 'C')

  let result = []
  if (batchGetRes.data.valueRanges) {
    for (let i = 0; i < batchGetRes.data.valueRanges.length; i++) {
      const values = batchGetRes.data.valueRanges[i].values[0]
      const uid = values[0]
      const name = values[1]
      const phoneticName = values[2]

      if (uid && name && phoneticName) {
        result.push({
          documentId: uid,
          name,
          phoneticName
        })
      }
    }
  }
  return result
}

/**
 * Fetch student records from the spreadsheet.
 * @param authClient
 * @param line
 * @returns {Promise<Array>}
 */
const fetchStudentRecords = async (authClient, line) => {
  const batchGetRes = await batchGet(authClient, '2019', line, 'H')

  let result = []
  if (batchGetRes.data.valueRanges) {
    for (let i = 0; i < batchGetRes.data.valueRanges.length; i++) {
      const values = batchGetRes.data.valueRanges[i].values[0]
      const uid = values[0]
      const school = values[1]
      const sei = values[2]
      const mei = values[3]
      const phoneticSei = values[4]
      const phoneticMei = values[5]
      const email = values[6] // Optional
      const phone = values[7] // Optional

      if (uid && school && sei && mei && phoneticSei && phoneticMei) {
        result.push({
          documentId: uid,
          school,
          year: 2019,
          sei,
          mei,
          phoneticSei,
          phoneticMei,
          email,
          phone
        })
      }
    }
  }
  return result
}

/**
 * Save records to the firestore.
 * @param authClient
 * @param collectionName 保存先のコレクション名
 * @param data 保存対象のオブジェクトの配列 documentId を含む場合、それをドキュメントIDとする
 * @returns {Promise<void>}
 */
const setDocumentsToFirestore = async (authClient, collectionName, data) => {
  if (data) {
    const ref = admin.firestore().collection(collectionName)

    for (let i = 0; i < data.length; i++) {
      const item = { ...data[i] }

      // Remove `documentId` from the object.
      const documentId = item.documentId
      delete item.documentId

      if (documentId) {
        await ref.doc(documentId).set(item)
      }
    }
  }
}

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

  // Sync the school records.
  await setDocumentsToFirestore(client, 'schools', await fetchSchoolRecords(client, 30))
  // Sync the location records.
  await setDocumentsToFirestore(client, 'locations', await fetchLocationRecords(client, 5))
  // Sync the student records
  await setDocumentsToFirestore(client, 'students', await fetchStudentRecords(client, 250))

  response.status(204).end()
})
