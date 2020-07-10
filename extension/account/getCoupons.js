const callApi = require('../api/callApi')

/**
 * @param {Object} context
 * @param {Object} input
 * @returns {Promise<{coupons}>}
 */
module.exports = async (context, { accountId }) => {
  const coupons = await callApi(context, {
    uri: `accounts/${encodeURIComponent(accountId)}/accountcoupons`
  })

  const lang = context.meta.appLanguage
    ? context.meta.appLanguage.substring(0, 2)
    : 'en'

  return {
    coupons: coupons.map(coupon => ({
      code: coupon.externalReference,
      label: coupon.i18nFields[lang]
        ? coupon.i18nFields[lang].title
        : coupon.i18nFields.en.title,
      imageUrl: coupon.images[0] && coupon.images[0].path,
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      customAttributes: {
        stateLevel: coupon.stateLevel
      }
    }))
  }
}
