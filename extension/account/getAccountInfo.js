const callAuthApi = require('../api/callAuthApi')

/**
 * @param {Object} context
 * @param {Object} input
 * @returns {Promise<{account}>}
 */
module.exports = async (context, { accountId }) => {
  const accountInfo = await callAuthApi(context, {
    uri: `accountdetails/${encodeURIComponent(accountId)}`
  })

  let card = null
  if (accountInfo.identifiers) {
    card = accountInfo.identifiers.find(i => i.type === 'CARDCODE')
  }

  return {
    account: {
      code: accountId,
      status: accountInfo.status.toLowerCase(),
      points: accountInfo.accountBalance.points,
      card: card && {
        code: card.code,
        label: card.displayCode,
        status: card.status.toLowerCase()
      },
      level: accountInfo.level && {
        code: accountInfo.level.name,
        // Gold, etc.
        label: accountInfo.level.name
      },
      customAttributes: {
        lockedPoints: accountInfo.accountBalance.lockedPoints
      }
    }
  }
}
