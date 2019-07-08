module.exports.pj = (obj) => {
  return JSON.stringify(obj)
}

module.exports.ppj = (obj) => {
  return JSON.stringify(obj, null, 2)
}

/**
 * 認証連携の state チェック用の乱数を得る
 * @returns {string}
 */
module.exports.getRandState = () => {
  const crypto = require('crypto')
  return crypto.randomBytes(8).toString('hex')
}
