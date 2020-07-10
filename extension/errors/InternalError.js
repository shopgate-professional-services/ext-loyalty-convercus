class InternalError extends Error {
  constructor () {
    super()

    this.code = 'EINTERNAL'
    this.message = 'An internal error occurred.'
  }
}

module.exports = InternalError
