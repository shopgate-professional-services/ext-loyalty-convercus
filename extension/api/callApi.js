const { promisify } = require('util')
const request = require('request')
const InternalError = require('../errors/InternalError')
const NotFoundError = require('../errors/NotFoundError')
const UnauthorizedError = require('../errors/UnauthorizedError')

const requestPromisified = promisify(request)
const allowedStatusCodes = [200, 201, 204]
const defRequestOptions = { qs: {}, headers: {} }

/**
 * @param {Object} context context
 * @param {Object} options request options
 * @returns {Promise<{Object}>}
 */
module.exports = async (context, options = defRequestOptions) => {
  const { apiUrl, interactionId } = context.config

  const requestOptions = {
    baseUrl: apiUrl,
    json: true,
    ...options,
    headers: {
      'interaction-id': interactionId,
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

    if (statusCode === 401 || statusCode === 403) {
      throw new UnauthorizedError()
    }

    if (statusCode === 404) {
      throw new NotFoundError(message || 'Entity not found')
    }
    context.log.warn({ statusCode, body }, 'API error')

    if (statusCode === 400) {
      throw new InternalError(`API error: ${code} ${message}`, body.error || [])
    }

    throw new InternalError(`API error: ${code} ${message}`)
  }

  if (requestOptions.json && typeof body === 'string') {
    context.log.warn({ response: body.slice(0, 100) }, 'Response is malformed')
    throw new InternalError('API response is malformed')
  }

  return body
}
