const callAuthApi = require('../api/callAuthApi')
const NotFoundError = require('../errors/NotFoundError')
const UnauthorizedError = require('../errors/UnauthorizedError')

/**
 * @param {Object} context
 * @param {Object} input
 * @returns {Promise<{account}>}
 */
module.exports = async (context, { code }) => {
  // User should be authorized to activate a card
  if (!context.meta.userId) {
    throw new UnauthorizedError()
  }

  const { id, status } = await callAuthApi(context, {
    uri: `accounts/${encodeURIComponent(code)}`,
    headers: {
      'id-type': 'APPCODE'
    }
  })

  if (status !== 'ACTIVE') {
    throw new NotFoundError('Given card id not active')
  }

  await context.storage.user.set('account', { accountId: id })
}
