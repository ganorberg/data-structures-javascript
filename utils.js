class InputError extends Error {
/**
 * Certain inputs should not be accepted in certain methods. In those cases,
 * throw an error with a detailed error message and stack trace.
 *
 * @constructor
 * @param {String} message - specific error message for user
 */
  constructor(message) {
    super(message);
    this.message = message;
  }

  static get name() { return 'InputError'; }
}

module.exports = { InputError };