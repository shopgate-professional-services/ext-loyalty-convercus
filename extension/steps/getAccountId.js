const UnauthorizedError = require('../errors/UnauthorizedError')
const NotFoundError = require('../errors/NotFoundError')

/**
 * @param {Object} context
 * @returns {Promise<void>}
 */
module.exports = async (context) => {
  // User should be authorized into App
  if (!context.meta.userId) {
    throw new UnauthorizedError()
  }

  const account = await context.storage.user.get('account')
  if (!account) {
    throw new NotFoundError('Account is not yet activated')
  }

  return account
}
