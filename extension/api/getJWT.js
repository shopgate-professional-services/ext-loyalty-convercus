const callApi = require('./callApi')

/**
 * @param {Object} context context
 * @returns {Promise<{Object}>}
 */
module.exports = async (context) => {
  const { credentials } = context.config

  return await callApi(context, {
    uri: 'auth/login',
    method: 'POST',
    json: false,
    headers: {
      'Content-Type': 'application/json',
      'interaction-id': ''
    },
    body: JSON.stringify({
      org: credentials.org,
      password: credentials.password,
      userName: credentials.userName
    })
  })
}
