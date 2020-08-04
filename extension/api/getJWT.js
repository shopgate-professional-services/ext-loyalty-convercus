const { promisify } = require('util')
const request = require('request')
const InternalError = require('../errors/InternalError')
const jwtDecode = require('jwt-decode')
const requestPromisified = promisify(request)
const allowedStatusCodes = [200, 201]

/**
 * @param {Object} context context
 * @returns {Promise<{Object}>}
 */
module.exports = async (context) => {
  const jwt = await context.storage.extension.get('jwt')

  if (jwt) {
    const decodedJwt = jwtDecode(jwt)

    if (Date.now() + 60 * 1000 < decodedJwt.exp * 1000) {
      return jwt
    }
  }

  // request new jwt
  const { apiUrl, credentials } = context.config

  const requestOptions = {
    baseUrl: apiUrl,
    uri: 'auth/login',
    json: true,
    method: 'POST',
    body: {
      org: credentials.org,
      password: credentials.password,
      userName: credentials.userName
    }
  }

  let statusCode
  let body
  try {
    ({ statusCode, body } = await requestPromisified(requestOptions))
  } catch (err) {
    context.log.warn(err, 'API error')
    throw new InternalError(`API error: ${err}`)
  }

  if (!allowedStatusCodes.includes(statusCode)) {
    const { code = statusCode, message } = body

    context.log.warn({ statusCode, body }, 'API error')
    throw new InternalError(`API error: ${code} ${message}`)
  }

  await context.storage.extension.set('jwt', body)

  return body
}
