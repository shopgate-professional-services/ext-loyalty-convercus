const callApi = require('../api/callApi')

/**
 * @param {Object} context
 * @param {Object} input
 * @returns {Promise<{coupons}>}
 */
module.exports = async (context, { accountId }) => {
  const bookings = await callApi(context, {
    uri: `accounts/${encodeURIComponent(accountId)}/bookings`
  })

  return {
    history: bookings.map(booking => ({
      code: booking.bookingId,
      label: booking.reason,
      points: booking.points,
      time: booking.bookingTime,
      customAttributes: {
        partnerName: booking.partner.name,
        storeName: booking.store.name
      }
    }))
  }
}
