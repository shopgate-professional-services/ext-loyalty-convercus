/**
 *
 * @TODO Remove this mock before merge
 * @link https://api.convercus.io/api-docs/swagger-ui.html?urls.primaryName=account#operations-AccountDetails-getAccountDetails
 */

const account = {
  id: '550e8400-e29b-11d4-a716-446655440000',
  program: 'Pgr-A',
  status: 'ACTIVE'
}

const accountdetails = {
  accountBalance: {
    lockedPoints: 120,
    points: 150
  },
  accountCoupons: [
    {
      accountCouponId: 'string',
      accountId: 'string',
      couponId: 'string',
      customProperties: [
        {
          name: 'string',
          value: 'string'
        }
      ],
      externalReference: 'string',
      i18nFields: {
        de: {
          title: 'Titel'
        },
        en: {
          title: 'Title'
        }
      },
      images: [
        {
          id: 'string',
          name: 'unicorn.jpg',
          path: 'https://image-repository/34565345-unicorn.jpg',
          tags: [
            'de',
            '400x400'
          ]
        }
      ],
      maxRedeemCount: 0,
      maxRedeemCountGlobal: 0,
      points: 0,
      pointsOfRedemption: [
        {
          unitType: 'PROGRAM',
          value: 'string'
        }
      ],
      redeemCount: 0,
      redeemCountGlobal: 0,
      stateLevel: 'string',
      usageType: 'INCENTIVE',
      validFrom: 'string',
      validTo: 'string'
    }
  ],
  accountId: '550e8400-e29b-11d4-a716-446655440000',
  identifiers: [
    {
      code: 'code',
      displayCode: 'CARD_12345',
      identifierId: '550e8400-e29b-11d4-a716-446655440000',
      status: 'ACTIVE',
      type: 'CARDCODE'
    }
  ],
  level: {
    currentStatePoints: 3250,
    name: 'Gold',
    neededStatePoints: 1000,
    neededStatePointsNextLevel: 5000,
    validTo: 'string'
  },
  memberships: [
    {
      birthDate: 'string',
      city: 'München',
      countryCode: 'DE',
      customProperties: [
        {
          name: 'string',
          value: 'string'
        }
      ],
      emailAddress: 'member1@convercus.de',
      familyName: 'Mustermann',
      genderCode: 'MALE',
      givenName: 'Max',
      memberRole: 'OWNER',
      optins: [
        {
          flag: true,
          type: 'email'
        }
      ],
      streetHouseNo: 'Bahnhofstraße 1',
      userId: 'string',
      zipCode: 80469
    }
  ],
  status: 'ACTIVE'
}

const accountCoupons = [
  {
    accountCouponId: 'string',
    accountId: 'string',
    couponId: 'string',
    customProperties: [
      {
        name: 'string',
        value: 'string'
      }
    ],
    externalReference: 'CODE_123',
    i18nFields: {
      de: {
        title: 'Titel'
      },
      en: {
        title: 'Title'
      }
    },
    images: [
      {
        id: 'string',
        name: 'unicorn.jpg',
        path: 'https://image-repository/34565345-unicorn.jpg',
        tags: [
          'de',
          '400x400'
        ]
      }
    ],
    maxRedeemCount: 0,
    maxRedeemCountGlobal: 0,
    points: 0,
    pointsOfRedemption: [
      {
        unitType: 'PROGRAM',
        value: 'string'
      }
    ],
    redeemCount: 0,
    redeemCountGlobal: 0,
    stateLevel: 'string',
    usageType: 'INCENTIVE',
    validFrom: '2020-07-10T00:00:00Z',
    validTo: '2020-07-31T00:00:00Z'
  }
]

const bookings = [
  {
    bookingId: '550e8400-e29b-11d4-a716-446655440000',
    bookingTime: '2019-02-18T13:45:23',
    bookingType: 'BURNBOOKING',
    bookingTypeCode: 'COU',
    interactionId: 'ETOS-20001-52-01',
    locked: false,
    partner: {
      name: 'Partner 1',
      partnerId: '550e8400-e29b-11d4-a716-446655440000'
    },
    points: 100,
    reason: 'summer action',
    referenceId: '550e8400-e29b-11d4-a716-446655440000',
    store: {
      name: 'Store 1',
      storeId: '550e8400-e29b-11d4-a716-446655440000'
    },
    valueTime: '2019-02-18T13:45:23'
  }
]

module.exports.mockCallApi = (context, options) => {
  if (options.uri.includes('accountdetails')) {
    return accountdetails
  }
  if (options.uri.includes('accountcoupons')) {
    return accountCoupons
  }
  if (options.uri.includes('bookings')) {
    return bookings
  }
  if (options.uri.includes('accounts/')) {
    return account
  }

  return null
}
