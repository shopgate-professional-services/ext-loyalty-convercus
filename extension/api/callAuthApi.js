const UnauthorizedError = require('../errors/UnauthorizedError')
const callApi = require('./callApi')
const getJWT = require('./getJWT')

/**
 * @param {Object} context context
 * @param {Object} options options
 * @returns {Promise<{Object}>}
 */
module.exports = async (context, options) => {
  let jwt = await context.storage.extension.get('jwt')

  if (!jwt) {
    jwt = await getJWT(context)
    context.log.info('Api JWT received')
  }

  let response
  try {
    response = await callApi(context, {
      ...options,
      headers: {
        ...options,
        Authorization: jwt
      }
    })
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      context.log.info('Api auth rejection, refresh JWT')
      // Retry with refreshed jwt
      jwt = await getJWT(context)
      response = await callApi(context, {
        ...options,
        headers: {
          ...options,
          Authorization: jwt
        }
      })
    } else {
      throw err
    }
  } finally {
    if (jwt) {
      context.storage.extension.set('jwt', jwt)
    }
  }

  return response
}
