const { promisify } = require('util')
const request = require('request')
const InternalError = require('../errors/InternalError')
const NotFoundError = require('../errors/NotFoundError')
const { mockCallApi } = require('../mocks')

const requestPromisified = promisify(request)
const allowedStatusCodes = [200, 201, 204]
const defRequestOptions = { qs: {}, headers: {} }

/**
 * @param {Object} context context
 * @param {Object} options request options
 * @returns {Promise<{Object}>}
 */
module.exports = async (context, options = defRequestOptions) => {
  // @TODO Remove this mock before merge
  return mockCallApi(context, options)

  const { apiToken } = context.config
  if (!apiToken) {
    context.log.warn('API token is not set')
    throw new InternalError('API token is not set')
  }

  const requestOptions = {
    baseUrl: 'https://api.convercus.io/',
    json: true,
    ...options,
    headers: {
      Authorization: apiToken,
      'id-type': 'ID',
      ...options.headers
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

    if (statusCode === 404) {
      throw new NotFoundError(message || 'Entity not found')
    }
    context.log.warn({ statusCode, body }, 'API error')

    if (statusCode === 400) {
      throw new InternalError(`API error: ${code} ${message}`, body.error || [])
    }

    throw new InternalError(`API error: ${code} ${message}`)
  }

  if (typeof body === 'string') {
    context.log.warn({ response: body.slice(0, 100) }, 'Response is malformed')
    throw new InternalError('API response is malformed')
  }

  return body
}
