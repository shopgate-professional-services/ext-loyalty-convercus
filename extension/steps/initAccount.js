const callApi = require('../api/callApi')
const NotFoundError = require('../errors/NotFoundError')
const UnauthorizedError = require('../errors/UnauthorizedError')

/**
 * @param {Object} context
 * @param {Object} input
 * @returns {Promise<{account}>}
 */
module.exports = async (context, { cardCode }) => {
  // User should be authorized to activate a card
  if (!context.meta.userId) {
    throw new UnauthorizedError()
  }

  const { id, status } = await callApi(context, {
    uri: `accounts/${encodeURIComponent(cardCode)}`,
    headers: {
      'id-type': 'CARDCODE'
    }
  })

  if (status !== 'ACTIVE') {
    throw new NotFoundError('Given card id not active')
  }

  await context.storage.user.set('account', { accountId: id })
}
